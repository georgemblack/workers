import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import AccountSelect from "@/components/AccountSelect";
import { importCSV } from "@/data/db";
import { Account } from "@/lib/Types";

export const Route = createFileRoute("/")({
  component: ImportPage,
});

function ImportPage() {
  const [csv, setCsv] = useState<string>("");
  const [account, setAccount] = useState<Account>(Account.CAPITAL_ONE_SAVOR);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async () => {
    const result = await importCSV({ data: { csv, account } });
    setStatus(result);
    setCsv("");
  };

  return (
    <main className="page-standard-width">
      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        className="h-64 textarea"
      />
      <div className="flex justify-between mt-4">
        <AccountSelect value={account} onSelect={setAccount} />
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
      <div className="mt-2">{status && <p>{status}</p>}</div>
    </main>
  );
}
