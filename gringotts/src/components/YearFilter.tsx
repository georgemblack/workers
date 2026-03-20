import * as React from "react";

function YearFilter({
  value,
  onSelect,
}: {
  value: number;
  onSelect: (month: number) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(Number(event.target.value));
  };

  return (
    <div className="select">
      <select value={value} onChange={handleChange}>
        <option key="2023" value={2023}>
          2023
        </option>
        <option key="2024" value={2024}>
          2024
        </option>
        <option key="2025" value={2025}>
          2025
        </option>
        <option key="2026" value={2026}>
          2026
        </option>
      </select>
    </div>
  );
}

export default YearFilter;
