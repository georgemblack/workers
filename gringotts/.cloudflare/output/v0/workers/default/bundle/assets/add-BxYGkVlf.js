import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { r as Bool, t as Account } from "./Types-Ci0UbdzN.js";
import { d as saveTransaction } from "./db-BP1alSrj.js";
import { t as Route } from "./add-DCuUgLIu.js";
import { t as Button } from "./button-h36q7tklakhd38nx-D4x2gb7U.js";
import { n as CategoryField, r as Autosuggest, t as TagField } from "./TagField-CAOlhKgM.js";
import { t as Input } from "./input-pehjmr1q131tz38w-DsbPfrm6.js";
import { t as AccountSelect } from "./AccountSelect-BH9vDsLy.js";
//#region src/routes/add.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddPage() {
	const { merchants } = Route.useLoaderData();
	const [statusMessage, setStatusMessage] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [merchant, setMerchant] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(null);
	const [tag, setTag] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [account, setAccount] = (0, import_react.useState)(Account.CAPITAL_ONE_QUICKSILVER);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (merchant === "" || category === null) return;
		const result = await saveTransaction({ data: {
			key: crypto.randomUUID(),
			day: Number(date.split("/")[1]),
			month: Number(date.split("/")[0]),
			year: Number(date.split("/")[2]),
			description: "Manually created",
			merchant,
			category,
			amount: Number(amount),
			credit: Bool.FALSE,
			account,
			tags: tag ? [tag] : null,
			notes: notes || null,
			skipped: Bool.FALSE,
			reviewed: Bool.TRUE
		} });
		setStatusMessage(result.message);
		setAmount("");
		setDate("");
		setMerchant("");
		setCategory(null);
		setTag(null);
		setNotes("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-standard-width",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "flex-1",
						placeholder: "Amount (i.e. 12.34)",
						value: amount,
						onChange: (e) => setAmount(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "flex-1",
						placeholder: "Date (i.e. 4/26/2024)",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Autosuggest, {
							value: merchant,
							suggestions: merchants,
							placeholder: "Merchant",
							onChange: setMerchant
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryField, {
							value: category,
							onSelect: setCategory
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagField, {
							value: tag,
							onSelect: setTag
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "w-full",
							placeholder: "Notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSelect, {
						value: account,
						onSelect: setAccount
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "primary",
						children: "Save"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children: statusMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: statusMessage })
		})]
	});
}
//#endregion
export { AddPage as component };
