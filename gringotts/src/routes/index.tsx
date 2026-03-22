import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
        className="textarea h-64"
      />
      <div className="mt-4 flex justify-between">
        <AccountSelect value={account} onSelect={setAccount} />
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
      <div className="mt-2">{status && <p>{status}</p>}</div>
    </main>
  );
}
