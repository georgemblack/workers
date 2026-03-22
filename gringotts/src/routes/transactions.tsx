import { Button } from "@cloudflare/kumo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Currency from "@/components/Currency";
import MonthFilter from "@/components/MonthFilter";
import TagFilter from "@/components/TagFilter";
import YearFilter from "@/components/YearFilter";
import {
  TransactionFilter,
  deleteTransaction,
  getTransactions,
} from "@/data/db";
import {
  AccountNames,
  Category,
  CategoryNames,
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

    getTransactions({ data: query }).then(setTransactions);
  }, [month, year, tag]);

  const handleDelete = async (id: number) => {
    await deleteTransaction({ data: id });
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const sorted = [...transactions].sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    if (a.day !== b.day) return a.day - b.day;
    return 0;
  });

  return (
    <main className="page-full-width">
      <div className="flex justify-end gap-2">
        <TagFilter value={tag} onSelect={setTag} />
        <MonthFilter value={month} onSelect={setMonth} />
        <YearFilter value={year} onSelect={setYear} />
      </div>
      <table className="mt-4 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Merchant</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Account</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((transaction) => (
            <tr key={transaction.id} className="border-b even:bg-gray-50">
              <td className="p-2">
                {transaction.month}/{transaction.day}/{transaction.year}
              </td>
              <td className="p-2">
                <Currency amount={transaction.amount} />
              </td>
              <td className="p-2">{transaction.merchant}</td>
              <td className="p-2">
                {CategoryNames[transaction.category as Category]}
              </td>
              <td className="p-2">{AccountNames[transaction.account]}</td>
              <td className="p-2">
                <Button
                  variant="secondary-destructive"
                  shape="square"
                  aria-label="Delete transaction"
                  onClick={() => {
                    if (transaction.id) handleDelete(transaction.id);
                  }}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
