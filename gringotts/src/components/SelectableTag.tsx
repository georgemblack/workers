import { Badge } from "@cloudflare/kumo";

import { Tag, TagNames } from "@/lib/Types";

function SelectableTag({
  value,
  selected,
  onChange,
}: {
  value: Tag;
  selected: boolean;
  onChange: (selected: boolean) => void;
}) {
  return (
    <span className="cursor-pointer" onClick={() => onChange(!selected)}>
      <Badge variant={selected ? "primary" : "outline"}>
        {selected ? `${TagNames[value]} ✔` : TagNames[value]}
      </Badge>
    </span>
  );
}

export default SelectableTag;
