import { Tag, TagNames } from "../lib/Types";

function TagFilter({
  value,
  onSelect,
}: {
  value: Tag | "Any";
  onSelect: (tag: Tag | "Any") => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as Tag | "Any");
  };

  const getOptions = () => {
    let result: JSX.Element[] = [];

    // Add "Any" option
    result.push(
      <option key="Any" value="Any">
        Any
      </option>,
    );

    // Add option for each tag
    for (const [key, value] of Object.entries(Tag)) {
      result.push(
        <option key={key} value={value}>
          {TagNames[value]}
        </option>,
      );
    }
    return result;
  };
  return (
    <div className="select">
      <select value={value} onChange={handleChange}>
        {getOptions()}
      </select>
    </div>
  );
}

export default TagFilter;
