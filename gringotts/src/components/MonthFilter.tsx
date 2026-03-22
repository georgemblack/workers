import { Select } from "@cloudflare/kumo";

import { Month } from "@/lib/Types";

function MonthFilter({
  value,
  onSelect,
}: {
  value: Month | "Any";
  onSelect: (month: Month | "Any") => void;
}) {
  return (
    <Select
      value={value as string}
      onValueChange={(v) => onSelect(v as Month | "Any")}
    >
      <Select.Option value="Any">Any</Select.Option>
      {Object.values(Month).map((month) => (
        <Select.Option key={month} value={month}>
          {month}
        </Select.Option>
      ))}
    </Select>
  );
}

export default MonthFilter;
