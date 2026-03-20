import { useEffect, useState } from "react";

import { Tag, TagNames, getProperTag } from "../lib/Types";
import Autosuggest from "./Autosuggest";

function TagField({
  value,
  onSelect,
}: {
  value: Tag | null;
  onSelect: (tag: Tag) => void;
}) {
  const initialInput = value ? TagNames[value] : "";
  const [input, setInput] = useState<string>(initialInput);

  const handleChange = (selected: string) => {
    setInput(selected);

    // If the current user input matches a tag, find 'proper' tag and send to parent.
    const proper = getProperTag(selected);
    if (proper) onSelect(proper);
  };

  useEffect(() => {
    if (value) setInput(TagNames[value]);
    if (value === null) setInput("");
  }, [value]);

  return (
    <Autosuggest
      value={input}
      suggestions={Object.keys(Tag).map((key) => TagNames[key as Tag])}
      placeholder="Tag"
      onChange={handleChange}
    />
  );
}

export default TagField;
