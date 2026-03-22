import { Button, Input, Surface } from "@cloudflare/kumo";
import { useState } from "react";

import Autosuggest from "@/components/Autosuggest";
import CategoryField from "@/components/CategoryField";
import Currency from "@/components/Currency";
import TagField from "@/components/TagField";
import { getRule, saveRule, updateTransaction } from "@/data/db";
import { AccountNames, Bool, Category, Tag, Transaction } from "@/lib/Types";

function ReviewForm({
  transaction,
  merchants,
  onComplete,
}: {
  transaction: Transaction;
  merchants: string[];
  onComplete: (id: number) => void;
}) {
  const [merchant, setMerchant] = useState<string>(transaction.merchant ?? "");
  const [category, setCategory] = useState<Category | null>(
    (transaction.category as Category) ?? null,
  );
  const [notes, setNotes] = useState<string>(transaction.notes ?? "");
  const [tag, setTag] = useState<Tag | null>(null);

  const [ruleCreated, setRuleCreated] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (merchant === "" || category === null) return;

    await updateTransaction({
      data: {
        ...transaction,
        merchant: merchant || null,
        category,
        notes: notes || null,
        tags: tag ? [tag] : null,
        reviewed: Bool.TRUE,
      },
    });
    if (transaction.id) onComplete(transaction.id);
  };

  const handleSkip = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateTransaction({
      data: {
        ...transaction,
        skipped: Bool.TRUE,
        reviewed: Bool.TRUE,
      },
    });
    if (transaction.id) onComplete(transaction.id);
  };

  return (
    <Surface className="rounded-lg p-4">
      <div className="flex justify-between font-mono">
        <p className="m-0">
          {transaction.month}/{transaction.day}/{transaction.year}
        </p>
        <p className={transaction.credit ? "mt-0 bg-green-300" : "mt-0"}>
          <Currency amount={transaction.amount} />
        </p>
      </div>
      <div className="text-gray-400">
        <p className="m-0">
          {transaction.description}, {AccountNames[transaction.account]}
        </p>
      </div>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="flex-1">
            <Autosuggest
              value={merchant}
              suggestions={merchants}
              placeholder="Merchant"
              onChange={async (merchant) => {
                setMerchant(merchant);

                const rule = await getRule({ data: merchant });
                if (rule) {
                  setCategory(rule.category as Category);
                }
              }}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex-1">
            <CategoryField value={category} onSelect={setCategory} />
          </div>
          <div className="flex-1">
            <TagField value={tag} onSelect={setTag} />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="mt-4 flex flex-1 justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={async () => {
              if (merchant === "" || category === null) return;
              await saveRule({
                data: {
                  merchant,
                  category,
                },
              });
              setRuleCreated(true);
            }}
            disabled={ruleCreated}
          >
            Create Rule
          </Button>
          <Button type="button" variant="secondary" onClick={handleSkip}>
            Skip
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </Surface>
  );
}

export default ReviewForm;
