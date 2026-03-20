import { useEffect, useState } from "react";

import { Category, CategoryNames, getProperCategory } from "../lib/Types";
import Autosuggest from "./Autosuggest";

function CategoryField({
  value,
  onSelect,
}: {
  value: Category | null;
  onSelect: (category: Category) => void;
}) {
  const initialInput = value ? CategoryNames[value] : "";
  const [input, setInput] = useState<string>(initialInput);

  const handleChange = (selected: string) => {
    setInput(selected);

    // If the current user input matches a category, find 'proper' category and send to parent.
    const proper = getProperCategory(selected);
    if (proper) onSelect(proper);
  };

  useEffect(() => {
    if (value) setInput(CategoryNames[value]);
    if (value === null) setInput("");
  }, [value]);

  return (
    <Autosuggest
      value={input}
      suggestions={Object.keys(Category).map(
        (key) => CategoryNames[key as Category],
      )}
      placeholder="Category"
      onChange={handleChange}
    />
  );
}

export default CategoryField;
