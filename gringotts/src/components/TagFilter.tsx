import { Select } from "@cloudflare/kumo";

import { Tag, TagNames } from "@/lib/Types";

function TagFilter({
  value,
  onSelect,
}: {
  value: Tag | "Any";
  onSelect: (tag: Tag | "Any") => void;
}) {
  return (
    <Select
      value={value as string}
      onValueChange={(v) => onSelect(v as Tag | "Any")}
    >
      <Select.Option value="Any">Any</Select.Option>
      {Object.values(Tag).map((tag) => (
        <Select.Option key={tag} value={tag}>
          {TagNames[tag]}
        </Select.Option>
      ))}
    </Select>
  );
}

export default TagFilter;
