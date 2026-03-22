import { Input } from "@cloudflare/kumo";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import ReviewForm from "@/components/ReviewForm";
import { getMerchants, getTransactions } from "@/data/db";
import { Transaction } from "@/lib/Types";

export const Route = createFileRoute("/review")({
  component: ReviewPage,
  loader: async () => {
    const [transactions, merchants] = await Promise.all([
      getTransactions({ data: { reviewed: false } }),
      getMerchants(),
    ]);
    return { transactions, merchants };
  },
});

function ReviewPage() {
  const initialData = Route.useLoaderData();
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialData.transactions,
  );
  const [amount, setAmount] = useState<string>("");

  const handleComplete = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = transactions.filter((transaction) => {
    if (amount === "") return true;
    return transaction.amount === Number(amount);
  });

  return (
    <main className="page-standard-width">
      <div className="flex items-center justify-end gap-1">
        <span>$</span>
        <div className="max-w-28">
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
      </div>
      {filtered.length === 0 && <p>No transactions to review</p>}
      {filtered.map((transaction) => (
        <div className="mt-4" key={transaction.id}>
          <ReviewForm
            transaction={transaction}
            merchants={initialData.merchants}
            onComplete={handleComplete}
          />
        </div>
      ))}
    </main>
  );
}
