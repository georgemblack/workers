import { Select } from "@cloudflare/kumo";

function YearFilter({
  value,
  onSelect,
}: {
  value: number;
  onSelect: (year: number) => void;
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2026 + 1 },
    (_, i) => 2026 + i,
  );

  return (
    <Select value={String(value)} onValueChange={(v) => onSelect(Number(v))}>
      {years.map((year) => (
        <Select.Option key={year} value={String(year)}>
          {year}
        </Select.Option>
      ))}
    </Select>
  );
}

export default YearFilter;
