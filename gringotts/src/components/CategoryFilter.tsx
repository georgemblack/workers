import { Select } from "@cloudflare/kumo";

import { Category, CategoryNames } from "@/lib/Types";

function CategoryFilter({
  value,
  onSelect,
}: {
  value: Category | "Any";
  onSelect: (category: Category | "Any") => void;
}) {
  return (
    <Select
      value={value as string}
      onValueChange={(v) => onSelect(v as Category | "Any")}
    >
      <Select.Option value="Any">Any</Select.Option>
      {Object.values(Category).map((category) => (
        <Select.Option key={category} value={category}>
          {CategoryNames[category]}
        </Select.Option>
      ))}
    </Select>
  );
}

export default CategoryFilter;
