import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { n as AccountNames, r as Bool } from "./Types-Ci0UbdzN.js";
import { f as updateTransaction, i as getRule, u as saveRule } from "./db-BP1alSrj.js";
import { t as Route } from "./review-BBK0L2PC.js";
import { t as Button, un as cn } from "./button-h36q7tklakhd38nx-D4x2gb7U.js";
import { n as CategoryField, r as Autosuggest, t as TagField } from "./TagField-CAOlhKgM.js";
import { t as LayerCard } from "./layer-card-dnikj7emx8qeaspz-DaiP7zi3.js";
import { t as Input } from "./input-pehjmr1q131tz38w-DsbPfrm6.js";
import { t as Currency } from "./Currency-DkkFRO-M.js";
//#region node_modules/.pnpm/@cloudflare+kumo@2.13.1_@date-fns+tz@1.5.0_@phosphor-icons+react@2.1.10_react-dom@19.2._1c74ab5ffe472ae7b50759dcb49bd302/node_modules/@cloudflare/kumo/dist/chunks/surface-ef2kr5pn7r1y3ipk.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* @deprecated Use `LayerCard` instead.
*
* Polymorphic compatibility wrapper that preserves the `Surface` API while
* delegating rendering and styling to `LayerCard`.
*
* @example
* ```tsx
* <LayerCard className="rounded-lg p-4">Card content</LayerCard>
* ```
*/
var Surface = function Surface({ color = "primary", className, render, as, ...props }) {
	const resolvedRender = render ?? (as ? (0, import_react.createElement)(as) : void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerCard, {
		className: cn("overflow-visible rounded-none", className),
		render: resolvedRender,
		...props,
		"data-surface-color": color,
		"data-deprecated": "surface"
	});
};
Surface.displayName = "Surface";
//#endregion
//#region src/components/ReviewForm.tsx
function ReviewForm({ transaction, merchants, onComplete }) {
	const [merchant, setMerchant] = (0, import_react.useState)(transaction.merchant ?? "");
	const [category, setCategory] = (0, import_react.useState)(transaction.category ?? null);
	const [notes, setNotes] = (0, import_react.useState)(transaction.notes ?? "");
	const [tag, setTag] = (0, import_react.useState)(null);
	const [ruleCreated, setRuleCreated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (merchant && !category) getRule({ data: merchant }).then((rule) => {
			if (rule) setCategory(rule.category);
		});
	}, []);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (merchant === "" || category === null) return;
		await updateTransaction({ data: {
			...transaction,
			merchant: merchant || null,
			category,
			notes: notes || null,
			tags: tag ? [tag] : null,
			reviewed: Bool.TRUE
		} });
		if (transaction.id) onComplete(transaction.id);
	};
	const handleSkip = async (event) => {
		event.preventDefault();
		await updateTransaction({ data: {
			...transaction,
			merchant: null,
			category: null,
			skipped: Bool.TRUE,
			reviewed: Bool.TRUE
		} });
		if (transaction.id) onComplete(transaction.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Surface, {
		className: "rounded-lg p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					transaction.month,
					"/",
					transaction.day,
					"/",
					transaction.year
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: transaction.credit ? "bg-green-300" : "",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currency, { amount: transaction.amount })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-gray-400",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					transaction.description,
					", ",
					AccountNames[transaction.account]
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Autosuggest, {
								value: merchant,
								suggestions: merchants,
								placeholder: "Merchant",
								onChange: async (merchant) => {
									setMerchant(merchant);
									const rule = await getRule({ data: merchant });
									if (rule) setCategory(rule.category);
								}
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
						className: "mt-2 flex flex-1 justify-end gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: async () => {
									if (merchant === "" || category === null) return;
									await saveRule({ data: {
										merchant,
										category
									} });
									setRuleCreated(true);
								},
								disabled: ruleCreated,
								children: "Create Rule"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: handleSkip,
								children: "Skip"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								variant: "primary",
								children: "Save"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/routes/review.tsx?tsr-split=component
function ReviewPage() {
	const initialData = Route.useLoaderData();
	const [transactions, setTransactions] = (0, import_react.useState)(initialData.transactions);
	const [amount, setAmount] = (0, import_react.useState)("");
	const handleComplete = (id) => {
		setTransactions((prev) => prev.filter((t) => t.id !== id));
	};
	const filtered = transactions.filter((transaction) => {
		if (amount === "") return true;
		return transaction.amount === Number(amount);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-standard-width",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "w-20",
					value: amount,
					onChange: (e) => setAmount(e.target.value),
					placeholder: "Amount"
				})]
			}),
			filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No transactions to review" }),
			filtered.map((transaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewForm, {
					transaction,
					merchants: initialData.merchants,
					onComplete: handleComplete
				})
			}, transaction.id))
		]
	});
}
//#endregion
export { ReviewPage as component };
