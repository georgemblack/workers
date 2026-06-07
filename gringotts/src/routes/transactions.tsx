import { Button, Table } from "@cloudflare/kumo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import AccountFilter from "@/components/AccountFilter";
import CategoryFilter from "@/components/CategoryFilter";
import Currency from "@/components/Currency";
import EditTransactionDialog from "@/components/EditTransactionDialog";
import MonthFilter from "@/components/MonthFilter";
import TagFilter from "@/components/TagFilter";
import YearFilter from "@/components/YearFilter";
import {
  TransactionFilter,
  deleteTransaction,
  getTransactions,
} from "@/data/db";
import {
  Account,
  AccountNames,
  Category,
  CategoryNames,
  Group,
  Groups,
  Month,
  Tag,
  Transaction,
  getMonthNumber as monthNumber,
} from "@/lib/Types";

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
});

function TransactionsPage() {
  const [tag, setTag] = useState<Tag | "Any">("Any");
  const [category, setCategory] = useState<Category | "Any">("Any");
  const [account, setAccount] = useState<Account | "Any">("Any");
  const [month, setMonth] = useState<Month | "Any">("Any");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const query: TransactionFilter = {
      year,
      skipped: false,
      reviewed: true,
    };

    if (month !== "Any") {
      query.month = monthNumber(month);
    }
    if (tag !== "Any") {
      query.tag = tag;
    }
    if (category !== "Any") {
      query.category = category;
    }
    if (account !== "Any") {
      query.account = account;
    }

    getTransactions({ data: query }).then(setTransactions);
  }, [month, year, tag, category, account]);

  const handleDelete = async (id: number) => {
    await deleteTransaction({ data: id });
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );
  };

  const sorted = [...transactions].sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    if (a.day !== b.day) return a.day - b.day;
    return 0;
  });

  return (
    <main className="page-full-width">
      <div className="flex justify-end gap-2">
        <CategoryFilter value={category} onSelect={setCategory} />
        <TagFilter value={tag} onSelect={setTag} />
        <AccountFilter value={account} onSelect={setAccount} />
        <MonthFilter value={month} onSelect={setMonth} />
        <YearFilter value={year} onSelect={setYear} />
      </div>
      <Table className="mt-4">
        <Table.Header>
          <Table.Row>
            <Table.Head>Date</Table.Head>
            <Table.Head>Amount</Table.Head>
            <Table.Head>Merchant</Table.Head>
            <Table.Head>Category</Table.Head>
            <Table.Head>Account</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sorted.map((transaction) => (
            <Table.Row key={transaction.id}>
              <Table.Cell>
                {transaction.month}/{transaction.day}/{transaction.year}
              </Table.Cell>
              <Table.Cell>
                <span
                  className={
                    Groups[transaction.category as Category] === Group.INCOME
                      ? "bg-green-300"
                      : ""
                  }
                >
                  <Currency amount={transaction.amount} />
                </span>
              </Table.Cell>
              <Table.Cell>{transaction.merchant}</Table.Cell>
              <Table.Cell>
                {CategoryNames[transaction.category as Category]}
              </Table.Cell>
              <Table.Cell>{AccountNames[transaction.account]}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end gap-2">
                  <EditTransactionDialog
                    transaction={transaction}
                    onSave={handleSave}
                  />
                  <Button
                    variant="destructive"
                    size="xs"
                    onClick={() => {
                      if (transaction.id) handleDelete(transaction.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </main>
  );
}
