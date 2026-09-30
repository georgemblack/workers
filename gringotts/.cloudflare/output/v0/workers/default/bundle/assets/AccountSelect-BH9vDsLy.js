import "./createServerFn-TpCK4c9B.js";
import { i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { n as AccountNames, t as Account } from "./Types-Ci0UbdzN.js";
import { t as Select } from "./select-ndqpqpmqtmn497rq-DpJiR7X5.js";
//#region src/components/AccountSelect.tsx
var import_jsx_runtime = require_jsx_runtime();
function AccountSelect({ value, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
		value,
		onValueChange: (v) => onSelect(v),
		children: Object.values(Account).map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select.Option, {
			value: account,
			children: AccountNames[account]
		}, account))
	});
}
//#endregion
export { AccountSelect as t };
