import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

import { process } from "@/lib/Process";
import {
  Account,
  Bool,
  Category,
  DBResult,
  Group,
  Groups,
  Month,
  MonthSummary,
  Rule,
  Summary,
  Transaction,
  getMonthNumber,
} from "@/lib/Types";
import { validRule, validTransaction } from "@/lib/Validate";

export interface TransactionFilter {
  month?: number;
  year?: number;
  tag?: string;
  skipped?: boolean;
  reviewed?: boolean;
}

interface TransactionRow {
  id: number;
  key: string;
  day: number;
  month: number;
  year: number;
  amount: number;
  credit: number;
  merchant: string | null;
  category: string | null;
  account: string;
  description: string;
  notes: string | null;
  tags: string | null;
  skipped: number;
  reviewed: number;
}

interface RuleRow {
  id: number;
  merchant: string;
  category: string;
}

function rowToTransaction(row: TransactionRow): Transaction {
  return {
    id: row.id,
    key: row.key,
    day: row.day,
    month: row.month,
    year: row.year,
    amount: row.amount,
    credit: row.credit as Bool,
    merchant: row.merchant,
    category: row.category,
    account: row.account as Account,
    description: row.description,
    notes: row.notes,
    tags: row.tags ? JSON.parse(row.tags) : null,
    skipped: row.skipped as Bool,
    reviewed: row.reviewed as Bool,
  };
}

function rowToRule(row: RuleRow): Rule {
  return {
    id: row.id,
    merchant: row.merchant,
    category: row.category,
  };
}

const INSERT_TRANSACTION_SQL = `INSERT INTO transactions (key, day, month, year, amount, credit, merchant, category, account, description, notes, tags, skipped, reviewed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

function bindTransaction(tx: Transaction) {
  return [
    tx.key,
    tx.day,
    tx.month,
    tx.year,
    tx.amount,
    tx.credit,
    tx.merchant,
    tx.category,
    tx.account,
    tx.description,
    tx.notes,
    tx.tags ? JSON.stringify(tx.tags) : null,
    tx.skipped,
    tx.reviewed,
  ];
}

// Merchants

export const getMerchants = createServerFn({ method: "GET" }).handler(
  async (): Promise<string[]> => {
    const result = await env.DB.prepare(
      "SELECT DISTINCT merchant FROM transactions WHERE merchant IS NOT NULL ORDER BY merchant",
    ).all();
    return result.results.map(
      (row: Record<string, unknown>) => row.merchant as string,
    );
  },
);

// Rules

export const getRule = createServerFn({ method: "GET" })
  .inputValidator((merchant: string) => merchant)
  .handler(async ({ data: merchant }): Promise<Rule | null> => {
    const result = await env.DB.prepare(
      "SELECT * FROM rules WHERE merchant = ?",
    )
      .bind(merchant)
      .first<RuleRow>();
    return result ? rowToRule(result) : null;
  });

export const getRules = createServerFn({ method: "GET" }).handler(
  async (): Promise<Rule[]> => {
    const result = await env.DB.prepare(
      "SELECT * FROM rules ORDER BY merchant",
    ).all<RuleRow>();
    return result.results.map(rowToRule);
  },
);

export const saveRule = createServerFn({ method: "POST" })
  .inputValidator((rule: { merchant: string; category: string }) => rule)
  .handler(async ({ data: rule }): Promise<DBResult> => {
    if (
      !validRule({
        merchant: rule.merchant,
        category: rule.category,
      })
    ) {
      return { success: false, message: "Error saving rule: invalid rule" };
    }
    try {
      await env.DB.prepare(
        "INSERT INTO rules (merchant, category) VALUES (?, ?)",
      )
        .bind(rule.merchant, rule.category)
        .run();
      return { success: true, message: "Saved rule" };
    } catch (error) {
      return { success: false, message: `Error saving rule: ${error}` };
    }
  });

export const deleteRule = createServerFn({ method: "POST" })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }): Promise<void> => {
    await env.DB.prepare("DELETE FROM rules WHERE id = ?").bind(id).run();
  });

// Transactions

export const getTransactions = createServerFn({ method: "GET" })
  .inputValidator((filter: TransactionFilter) => filter)
  .handler(async ({ data: filter }): Promise<Transaction[]> => {
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (filter.month !== undefined) {
      conditions.push("month = ?");
      params.push(filter.month);
    }
    if (filter.year !== undefined) {
      conditions.push("year = ?");
      params.push(filter.year);
    }
    if (filter.skipped !== undefined) {
      conditions.push("skipped = ?");
      params.push(filter.skipped ? 1 : 0);
    }
    if (filter.reviewed !== undefined) {
      conditions.push("reviewed = ?");
      params.push(filter.reviewed ? 1 : 0);
    }

    let sql = "SELECT * FROM transactions";
    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }
    sql += " ORDER BY month, day";

    const result = await env.DB.prepare(sql)
      .bind(...params)
      .all<TransactionRow>();
    let transactions = result.results.map(rowToTransaction);

    if (filter.tag) {
      transactions = transactions.filter((t: Transaction) =>
        t.tags?.includes(filter.tag!),
      );
    }

    return transactions;
  });

export const saveTransaction = createServerFn({ method: "POST" })
  .inputValidator((tx: Transaction) => tx)
  .handler(async ({ data: tx }): Promise<DBResult> => {
    if (!validTransaction(tx)) {
      return {
        success: false,
        message: "Error saving transaction: invalid transaction",
      };
    }
    try {
      await env.DB.prepare(INSERT_TRANSACTION_SQL)
        .bind(...bindTransaction(tx))
        .run();
      return { success: true, message: "Saved transaction" };
    } catch (error) {
      return { success: false, message: `Error saving transaction: ${error}` };
    }
  });

export const importCSV = createServerFn({ method: "POST" })
  .inputValidator((input: { csv: string; account: string }) => input)
  .handler(async ({ data: { csv, account } }): Promise<string> => {
    const processResult = process(csv, account as Account);

    const invalid = processResult.transactions.filter(
      (t) => !validTransaction(t),
    );
    if (invalid.length > 0) {
      return `${processResult.message}; Error: ${invalid.length} transactions are not valid`;
    }

    try {
      const stmts = processResult.transactions.map((tx) =>
        env.DB.prepare(INSERT_TRANSACTION_SQL).bind(...bindTransaction(tx)),
      );
      await env.DB.batch(stmts);
    } catch (error) {
      return `${processResult.message}; Error saving transactions: ${error}`;
    }

    // Queue merchant suggestion jobs for transactions missing a merchant
    const toQueue = processResult.transactions.filter((tx) => !tx.merchant);
    const BATCH_LIMIT = 100;
    for (let i = 0; i < toQueue.length; i += BATCH_LIMIT) {
      try {
        await env.QUEUE.sendBatch(
          toQueue.slice(i, i + BATCH_LIMIT).map((tx) => ({
            body: { key: tx.key, description: tx.description },
          })),
        );
      } catch (error) {
        console.error(`Error queuing merchant suggestions: ${error}`);
      }
    }

    return `${processResult.message}; Saved ${processResult.transactions.length} transactions`;
  });

export const updateTransaction = createServerFn({ method: "POST" })
  .inputValidator((tx: Transaction) => tx)
  .handler(async ({ data: tx }): Promise<DBResult> => {
    if (!tx.id) {
      return {
        success: false,
        message: "Error updating transaction: no id",
      };
    }
    if (!validTransaction(tx)) {
      return {
        success: false,
        message: "Error updating transaction: invalid transaction",
      };
    }
    try {
      await env.DB.prepare(
        `UPDATE transactions SET key = ?, day = ?, month = ?, year = ?, amount = ?, credit = ?, merchant = ?, category = ?, account = ?, description = ?, notes = ?, tags = ?, skipped = ?, reviewed = ? WHERE id = ?`,
      )
        .bind(...bindTransaction(tx), tx.id)
        .run();
      return { success: true, message: "Transaction updated" };
    } catch (error) {
      return {
        success: false,
        message: `Error updating transaction: ${error}`,
      };
    }
  });

export const deleteTransaction = createServerFn({ method: "POST" })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }): Promise<void> => {
    await env.DB.prepare("DELETE FROM transactions WHERE id = ?")
      .bind(id)
      .run();
  });

// Summary

export const getSummary = createServerFn({ method: "GET" })
  .inputValidator((year: number) => year)
  .handler(async ({ data: year }): Promise<Summary> => {
    const dbResult = await env.DB.prepare(
      "SELECT * FROM transactions WHERE year = ?",
    )
      .bind(year)
      .all<TransactionRow>();
    const transactions = dbResult.results.map(rowToTransaction);

    const result: Summary = { items: [] };

    for (const month of Object.values(Month)) {
      const newItem: MonthSummary = {
        month,
        categories: [],
        groups: [],
        totals: { income: 0, spending: 0, expected: 0 },
      };

      const transactionsForMonth = transactions.filter(
        (t: Transaction) => t.month === getMonthNumber(month),
      );

      const income = transactionsForMonth
        .filter(
          (t: Transaction) => Groups[t.category as Category] === Group.INCOME,
        )
        .reduce((acc: number, t: Transaction) => acc + t.amount, 0);

      const spending = transactionsForMonth
        .filter((t: Transaction) =>
          [Group.ESSENTIAL, Group.ELECTIVE].includes(
            Groups[t.category as Category],
          ),
        )
        .reduce((acc: number, t: Transaction) => acc + t.amount, 0);

      newItem.totals = {
        income,
        spending,
        expected: income * 0.2,
      };

      Object.values(Category).forEach((category: Category) => {
        const total = transactionsForMonth
          .filter((t: Transaction) => t.category === category)
          .reduce((acc: number, t: Transaction) => acc + t.amount, 0);
        newItem.categories.push({ category, total });
      });

      Object.values(Groups).forEach((group) => {
        const total = newItem.categories
          .filter((c) => Groups[c.category] === group)
          .reduce((acc, c) => acc + c.total, 0);
        newItem.groups.push({
          group,
          total,
          expected: expectedBudget(income, group),
        });
      });

      result.items.push(newItem);
    }

    return result;
  });

function expectedBudget(total: number, group: Group): number {
  switch (group) {
    case Group.ESSENTIAL:
      return total * 0.5;
    case Group.ELECTIVE:
      return total * 0.3;
  }
  return 0;
}
