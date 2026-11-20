import { useState } from "preact/hooks";

type Result = { ok: boolean; nodes: number; entries: number; errors: string[] };

/** One-time page for importing data from brain (plan 07). Check first, then import. */
export function ImportPage() {
  const [text, setText] = useState<string | null>(null);
  const [checked, setChecked] = useState<Result | null>(null);
  const [done, setDone] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async (dryRun: boolean) => {
    setBusy(true);
    try {
      const response = await fetch(
        `/api/admin/import?dry_run=${dryRun ? 1 : 0}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: text!,
        },
      );
      const result = (await response.json().catch(() => ({
        ok: false,
        nodes: 0,
        entries: 0,
        errors: [`Request failed (${response.status})`],
      }))) as Result;
      if (dryRun) setChecked(result);
      else setDone(result);
    } finally {
      setBusy(false);
    }
  };
  const show = (result: Result) =>
    result.ok ? (
      <p>
        {result.nodes} records and {result.entries} entries.
      </p>
    ) : (
      <ul class="error">
        {result.errors.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    );
  return (
    <main class="import">
      <h1>Import</h1>
      <p class="meta">Choose a brain2 import file, check it, then import it.</p>
      <input
        type="file"
        accept="application/json"
        aria-label="Import file"
        onChange={async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          setChecked(null);
          setDone(null);
          setText(file ? await file.text() : null);
        }}
      />
      <div class="actions">
        <button disabled={!text || busy} onClick={() => run(true)}>
          Check
        </button>
        <button
          disabled={!checked?.ok || !!done || busy}
          onClick={() => run(false)}
        >
          Import
        </button>
      </div>
      {checked && !done && (
        <section class="section">
          <h2>Check</h2>
          {show(checked)}
        </section>
      )}
      {done && (
        <section class="section">
          <h2>{done.ok ? "Imported" : "Import failed"}</h2>
          {show(done)}
          {done.ok && <a href="/">Open brain</a>}
        </section>
      )}
    </main>
  );
}
