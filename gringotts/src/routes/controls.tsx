import { Button } from "@cloudflare/kumo";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { requeueUnreviewedTransactions } from "@/data/db";

export const Route = createFileRoute("/controls")({
  component: ControlsPage,
});

function ControlsPage() {
  const [status, setStatus] = useState<string>("");
  const [isQueueing, setIsQueueing] = useState<boolean>(false);

  const handleRequeue = async () => {
    setIsQueueing(true);
    setStatus("");

    try {
      const result = await requeueUnreviewedTransactions();
      setStatus(result);
    } finally {
      setIsQueueing(false);
    }
  };

  return (
    <main className="page-standard-width">
      <h1 className="text-xl font-semibold">Controls</h1>
      <div className="mt-4">
        <Button onClick={handleRequeue} disabled={isQueueing}>
          {isQueueing ? "Re-queueing…" : "Re-queue un-reviewed transactions"}
        </Button>
      </div>
      {status && <p className="mt-2">{status}</p>}
    </main>
  );
}
