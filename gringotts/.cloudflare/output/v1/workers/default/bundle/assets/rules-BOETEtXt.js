import "./createServerFn-TpCK4c9B.js";
import { i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { i as useRouter } from "./useStore-qBS1v-I6.js";
import { a as CategoryNames } from "./Types-Ci0UbdzN.js";
import { t as deleteRule } from "./db-BP1alSrj.js";
import { t as Route } from "./rules-Cbqj_EIL.js";
import { t as Button } from "./button-hzvowfkbathmx8yg-Ddqo88Fb.js";
import { t as Table } from "./table-ngl1b5yc8mcur662-CAy4bvFL.js";
//#region src/routes/rules.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function RulesPage() {
	const rules = Route.useLoaderData();
	const router = useRouter();
	const handleDelete = async (id) => {
		await deleteRule({ data: id });
		await router.invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "page-standard-width",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, { children: "Merchant" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, { children: "Category" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Head, {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Body, { children: rules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table.Row, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: rule.merchant }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, { children: CategoryNames[rule.category] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table.Cell, {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "xs",
						onClick: () => {
							if (rule.id) handleDelete(rule.id);
						},
						children: "Delete"
					})
				})
			] }, rule.id)) })]
		})
	});
}
//#endregion
export { RulesPage as component };

//# sourceMappingURL=rules-BOETEtXt.js.map