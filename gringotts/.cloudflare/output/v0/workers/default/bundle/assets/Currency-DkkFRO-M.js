import { i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
//#region src/components/Currency.tsx
var import_jsx_runtime = require_jsx_runtime();
function Currency({ amount }) {
	const formatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	}).format(amount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatted });
}
//#endregion
export { Currency as t };
