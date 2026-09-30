import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { a as CategoryNames, c as Month, i as Category, o as Group, s as Groups } from "./Types-Ci0UbdzN.js";
import { o as getSummary } from "./db-BP1alSrj.js";
import { t as Table } from "./table-miggde3uqhhrd5at-CDtco2f4.js";
import { t as Currency } from "./Currency-DkkFRO-M.js";
import { t as YearFilter } from "./YearFilter-BWNhexqg.js";
//#region src/components/EmptyRow.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmptyRow({ cols }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, {
		colSpan: cols,
		children: "-"
	}) });
}
//#endregion
//#region src/routes/summary.tsx?tsr-split=component
function SummaryPage() {
	const [year, setYear] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getFullYear());
	const [summary, setSummary] = (0, import_react.useState)({ items: [] });
	const rows = (group) => {
		return Object.values(Category).filter((c) => Groups[c] === group).map((category) => {
			const columns = [];
			Object.values(Month).forEach((month, i) => {
				const value = summary.items.find((item) => item.month === month)?.categories.find((c) => c.category === category);
				columns.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, { amount: value?.total || 0 }) }, i));
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: CategoryNames[category] }), columns] }, category);
		});
	};
	const groupTotalRow = (group) => {
		const columns = [];
		Object.values(Month).forEach((month, i) => {
			const value = summary.items.find((item) => item.month === month)?.groups.find((g) => g.group === group);
			columns.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "p-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, { amount: value?.total || 0 })
			}, i));
		});
		let classes = "font-bold !bg-green-100";
		if (group === Group.ESSENTIAL) classes = "font-bold !bg-pink-100";
		if (group === Group.ELECTIVE) classes = "font-bold !bg-orange-100";
		if (group === Group.INVESTMENT) classes = "font-bold !bg-blue-100";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, {
			className: classes,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: "Total" }), columns]
		});
	};
	const totalRows = () => {
		const rowElements = [];
		const items = [];
		Object.values(Month).forEach((month) => {
			const item = summary.items.find((item) => item.month === month);
			if (item) items.push(item);
		});
		let columns = [];
		items.forEach((item, i) => {
			columns.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, { amount: item.totals.income }) }, i));
		});
		rowElements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: "Income" }), columns] }, "income"));
		columns = [];
		items.forEach((item, i) => {
			columns.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, { amount: item.totals.spending }) }, i));
		});
		rowElements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: "Spending" }), columns] }, "spending"));
		columns = [];
		items.forEach((item, i) => {
			columns.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, { amount: item.totals.income - item.totals.spending }) }, i));
		});
		rowElements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, {
			className: "!bg-emerald-300 font-bold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: "Take Home" }), columns]
		}, "takehome"));
		return rowElements;
	};
	(0, import_react.useEffect)(() => {
		getSummary({ data: year }).then((result) => setSummary(result));
	}, [year]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-full-width",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearFilter, {
				value: year,
				onSelect: setYear
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, {}), Object.values(Month).map((month) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, { children: month }, month))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Body, { children: [
				rows(Group.INCOME),
				groupTotalRow(Group.INCOME),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRow, { cols: 13 }),
				rows(Group.ESSENTIAL),
				groupTotalRow(Group.ESSENTIAL),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRow, { cols: 13 }),
				rows(Group.ELECTIVE),
				groupTotalRow(Group.ELECTIVE),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRow, { cols: 13 }),
				rows(Group.INVESTMENT),
				groupTotalRow(Group.INVESTMENT),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRow, { cols: 13 }),
				totalRows()
			] })]
		})]
	});
}
//#endregion
export { SummaryPage as component };
