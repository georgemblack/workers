import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Currency from "@/components/Currency";
import EmptyRow from "@/components/EmptyRow";
import YearFilter from "@/components/YearFilter";
import { getSummary } from "@/data/db";
import {
  Group,
  Groups,
  CategoryNames,
  Month,
  Summary as TransactionSummary,
  Category,
  MonthSummary,
} from "@/lib/Types";

export const Route = createFileRoute("/summary")({
  component: SummaryPage,
});

function SummaryPage() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [summary, setSummary] = useState<TransactionSummary>({ items: [] });

  const rows = (group: Group) => {
    const categories = Object.values(Category).filter(
      (c) => Groups[c] === group,
    );

    return categories.map((category) => {
      const columns: React.ReactNode[] = [];

      Object.values(Month).forEach((month, i) => {
        const item = summary.items.find((item) => item.month === month);
        const value = item?.categories.find((c) => c.category === category);
        columns.push(
          <td key={i} className="p-1">
            <Currency amount={value?.total || 0} />
          </td>,
        );
      });

      return (
        <tr key={category} className="border-b">
          <td className="p-1">{CategoryNames[category]}</td>
          {columns}
        </tr>
      );
    });
  };

  const groupTotalRow = (group: Group) => {
    const columns: React.ReactNode[] = [];

    Object.values(Month).forEach((month, i) => {
      const item = summary.items.find((item) => item.month === month);
      const value = item?.groups.find((g) => g.group === group);
      columns.push(
        <td key={i} className="p-1">
          <Currency amount={value?.total || 0} />
        </td>,
      );
    });

    let classes = "font-bold bg-green-100";
    if (group === Group.ESSENTIAL) classes = "font-bold bg-pink-100";
    if (group === Group.ELECTIVE) classes = "font-bold bg-orange-100";
    if (group === Group.INVESTMENT) classes = "font-bold bg-blue-100";

    return (
      <tr className={classes}>
        <td className="p-1">Total</td>
        {columns}
      </tr>
    );
  };

  const totalRows = () => {
    const rowElements: React.ReactNode[] = [];
    const items: MonthSummary[] = [];

    Object.values(Month).forEach((month) => {
      const item = summary.items.find((item) => item.month === month);
      if (item) items.push(item);
    });

    // Income row
    let columns: React.ReactNode[] = [];
    items.forEach((item, i) => {
      columns.push(
        <td key={i} className="p-1">
          <Currency amount={item.totals.income} />
        </td>,
      );
    });
    rowElements.push(
      <tr key="income" className="border-b">
        <td className="p-1">Income</td>
        {columns}
      </tr>,
    );

    // Spending row
    columns = [];
    items.forEach((item, i) => {
      columns.push(
        <td key={i} className="p-1">
          <Currency amount={item.totals.spending} />
        </td>,
      );
    });
    rowElements.push(
      <tr key="spending" className="border-b">
        <td className="p-1">Spending</td>
        {columns}
      </tr>,
    );

    // Take home row
    columns = [];
    items.forEach((item, i) => {
      columns.push(
        <td key={i} className="p-1">
          <Currency amount={item.totals.income - item.totals.spending} />
        </td>,
      );
    });
    rowElements.push(
      <tr key="takehome" className="bg-emerald-300 font-bold">
        <td className="p-1">Take Home</td>
        {columns}
      </tr>,
    );

    return rowElements;
  };

  useEffect(() => {
    getSummary({ data: year }).then((result) => setSummary(result));
  }, [year]);

  return (
    <main className="page-full-width">
      <div className="flex justify-end gap-2">
        <YearFilter value={year} onSelect={setYear} />
      </div>
      <table className="mt-4 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-1"></th>
            {Object.values(Month).map((month) => (
              <th key={month} className="p-1 text-left">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows(Group.INCOME)}
          {groupTotalRow(Group.INCOME)}
          <EmptyRow cols={13} />
          {rows(Group.ESSENTIAL)}
          {groupTotalRow(Group.ESSENTIAL)}
          <EmptyRow cols={13} />
          {rows(Group.ELECTIVE)}
          {groupTotalRow(Group.ELECTIVE)}
          <EmptyRow cols={13} />
          {rows(Group.INVESTMENT)}
          {groupTotalRow(Group.INVESTMENT)}
          <EmptyRow cols={13} />
          {totalRows()}
        </tbody>
      </table>
    </main>
  );
}
