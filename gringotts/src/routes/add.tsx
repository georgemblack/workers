import AccountSelect from "@/components/AccountSelect";
import Autosuggest from "@/components/Autosuggest";
import CategoryField from "@/components/CategoryField";
import TagField from "@/components/TagField";
import { getMerchants, saveTransaction } from "@/data/db";
import { Account, Bool, Category, Tag } from "@/lib/Types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/add")({
  component: AddPage,
  loader: async () => {
    const merchants = await getMerchants();
    return { merchants };
  },
});

function AddPage() {
  const { merchants } = Route.useLoaderData();
  const [statusMessage, setStatusMessage] = useState<string>("");

  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [merchant, setMerchant] = useState<string>("");
  const [category, setCategory] = useState<Category | null>(null);
  const [tag, setTag] = useState<Tag | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [account, setAccount] = useState<Account>(
    Account.CAPITAL_ONE_QUICKSILVER,
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (merchant === "" || category === null) return;

    const result = await saveTransaction({
      data: {
        key: crypto.randomUUID(),
        day: Number(date.split("/")[1]),
        month: Number(date.split("/")[0]),
        year: Number(date.split("/")[2]),
        description: "Manually created",
        merchant,
        category,
        amount: Number(amount),
        credit: Bool.FALSE,
        account,
        tags: tag ? [tag] : null,
        notes: notes || null,
        skipped: Bool.FALSE,
        reviewed: Bool.TRUE,
      },
    });
    setStatusMessage(result.message);
    setAmount("");
    setDate("");
    setMerchant("");
    setCategory(null);
    setTag(null);
    setNotes("");
  };

  return (
    <main className="page-standard-width">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mt-4">
          <input
            className="input"
            placeholder="Amount (i.e. 12.34)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="input"
            placeholder="Date (i.e. 4/26/2024)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-4">
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
        <div className="flex gap-2 mt-4">
          <div className="flex-1">
            <TagField value={tag} onSelect={setTag} />
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="flex-1">
            <input
              className="input"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex justify-between mt-4">
          <AccountSelect value={account} onSelect={setAccount} />
          <button type="submit" className="button is-primary">
            Save
          </button>
        </div>
      </form>
      <div className="mt-2">{statusMessage && <p>{statusMessage}</p>}</div>
    </main>
  );
}
