import { Button, Dialog, Input } from "@cloudflare/kumo";
import { useEffect, useState } from "react";

import AccountSelect from "@/components/AccountSelect";
import Autosuggest from "@/components/Autosuggest";
import CategoryField from "@/components/CategoryField";
import TagField from "@/components/TagField";
import { getMerchants, updateTransaction } from "@/data/db";
import { Account, Category, Tag, Transaction } from "@/lib/Types";

function EditTransactionDialog({
  transaction,
  onSave,
}: {
  transaction: Transaction;
  onSave: (tx: Transaction) => void;
}) {
  const [open, setOpen] = useState(false);
  const [merchants, setMerchants] = useState<string[]>([]);

  const [day, setDay] = useState<number>(transaction.day);
  const [month, setMonth] = useState<number>(transaction.month);
  const [year, setYear] = useState<number>(transaction.year);
  const [amount, setAmount] = useState<string>(String(transaction.amount));
  const [merchant, setMerchant] = useState<string>(transaction.merchant ?? "");
  const [category, setCategory] = useState<Category | null>(
    (transaction.category as Category) ?? null,
  );
  const [account, setAccount] = useState<Account>(transaction.account);
  const [notes, setNotes] = useState<string>(transaction.notes ?? "");
  const [tag, setTag] = useState<Tag | null>(
    (transaction.tags?.[0] as Tag) ?? null,
  );

  useEffect(() => {
    if (open) getMerchants().then(setMerchants);
  }, [open]);

  const reset = () => {
    setDay(transaction.day);
    setMonth(transaction.month);
    setYear(transaction.year);
    setAmount(String(transaction.amount));
    setMerchant(transaction.merchant ?? "");
    setCategory((transaction.category as Category) ?? null);
    setAccount(transaction.account);
    setNotes(transaction.notes ?? "");
    setTag((transaction.tags?.[0] as Tag) ?? null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updated: Transaction = {
      ...transaction,
      day,
      month,
      year,
      amount: Number(amount),
      merchant: merchant || null,
      category,
      account,
      notes: notes || null,
      tags: tag ? [tag] : null,
    };
    const result = await updateTransaction({ data: updated });
    if (result.success) {
      onSave(updated);
      setOpen(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <Dialog.Trigger
        render={(p) => (
          <Button {...p} variant="secondary" size="xs">
            Edit
          </Button>
        )}
      />
      <Dialog size="lg" className="p-6">
        <Dialog.Title>Edit Transaction</Dialog.Title>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input
              className="w-20"
              type="number"
              placeholder="Month"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            />
            <Input
              className="w-20"
              type="number"
              placeholder="Day"
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
            />
            <Input
              className="w-24"
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            <Input
              className="flex-1"
              type="number"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <div className="flex-1">
              <Autosuggest
                value={merchant}
                suggestions={merchants}
                placeholder="Merchant"
                onChange={setMerchant}
              />
            </div>
            <div className="flex-1">
              <CategoryField value={category} onSelect={setCategory} />
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <div className="flex-1">
              <AccountSelect value={account} onSelect={setAccount} />
            </div>
            <div className="flex-1">
              <TagField value={tag} onSelect={setTag} />
            </div>
          </div>
          <div className="mt-2">
            <Input
              className="w-full"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close
              render={(p) => (
                <Button {...p} type="button" variant="secondary">
                  Cancel
                </Button>
              )}
            />
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </Dialog>
    </Dialog.Root>
  );
}

export default EditTransactionDialog;
