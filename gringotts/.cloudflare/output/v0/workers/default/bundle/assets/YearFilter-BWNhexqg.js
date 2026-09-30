import "./createServerFn-TpCK4c9B.js";
import { i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { t as Select } from "./select-ndqpqpmqtmn497rq-DpJiR7X5.js";
//#region src/components/YearFilter.tsx
var import_jsx_runtime = require_jsx_runtime();
function YearFilter({ value, onSelect }) {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const years = Array.from({ length: currentYear - 2026 + 1 }, (_, i) => 2026 + i);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
		value: String(value),
		onValueChange: (v) => onSelect(Number(v)),
		children: years.map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: String(year),
			children: year
		}, year))
	});
}
//#endregion
export { YearFilter as t };
