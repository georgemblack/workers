import { Account, Bool, Category, type Transaction } from "./Types";

interface ImportRule {
  match: (tx: Transaction) => boolean;
  apply: (tx: Transaction) => Transaction;
}

const rules: ImportRule[] = [
  {
    match: (tx) =>
      tx.account === Account.APPLE_SAVINGS &&
      tx.description === "Daily Cash Deposit" &&
      tx.credit === Bool.TRUE,
    apply: (tx) => ({
      ...tx,
      merchant: "Goldman Sachs",
      category: Category.BANKING_REWARDS,
      reviewed: Bool.TRUE,
    }),
  },
  {
    match: (tx) =>
      tx.account === Account.APPLE_SAVINGS &&
      tx.description === "Interest Paid" &&
      tx.credit === Bool.TRUE,
    apply: (tx) => ({
      ...tx,
      merchant: "Goldman Sachs",
      category: Category.BANKING_REWARDS,
      reviewed: Bool.TRUE,
    }),
  },
];

/**
 * Apply import rules to a list of transactions. Transactions matching a rule
 * are updated in-place with the rule's values. Returns the list of transactions
 * that were NOT matched by any rule (i.e. still need AI processing).
 */
export function applyImportRules(transactions: Transaction[]): {
  matched: Transaction[];
  unmatched: Transaction[];
} {
  const matched: Transaction[] = [];
  const unmatched: Transaction[] = [];

  for (const tx of transactions) {
    const rule = rules.find((r) => r.match(tx));
    if (rule) {
      const updated = rule.apply(tx);
      Object.assign(tx, updated);
      matched.push(tx);
    } else {
      unmatched.push(tx);
    }
  }

  return { matched, unmatched };
}
