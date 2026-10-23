/** Keep a small core/recent context in the prompt; full records remain retrievable. */
export function contextForPrompt(
  records: Array<{ id: string; title: string; body: string; core?: boolean }>,
  budget = 16000,
) {
  const selected: unknown[] = [];
  const omitted: Array<{ id: string; title: string }> = [];
  let remaining = budget - 2200;
  for (const record of [...records].sort(
    (a, b) => Number(!!b.core) - Number(!!a.core),
  )) {
    const serialized = JSON.stringify(record);
    if (serialized.length <= remaining) {
      selected.push(record);
      remaining -= serialized.length + 1;
    } else if (
      JSON.stringify(omitted).length +
        record.id.length +
        record.title.length +
        30 <
      2000
    )
      omitted.push({ id: record.id, title: record.title });
  }
  return {
    records: selected,
    omitted,
    truncated: selected.length < records.length,
    retrieval:
      "Use search_records and get_record for full supporting facts; omitted records are still stored.",
  };
}
