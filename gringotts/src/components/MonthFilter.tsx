import * as React from "react";

import { Month } from "../lib/Types";

function MonthFilter({
  value,
  onSelect,
}: {
  value: Month | "Any";
  onSelect: (month: Month | "Any") => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as Month | "Any");
  };

  const getOptions = () => {
    let result: JSX.Element[] = [];

    // Add "Any" option
    result.push(
      <option key="Any" value="Any">
        Any
      </option>,
    );

    // Add option for each month
    for (const [key, value] of Object.entries(Month)) {
      result.push(
        <option key={key} value={value}>
          {value}
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

export default MonthFilter;
