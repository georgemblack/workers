import { y as __toESM } from "./createServerFn-TpCK4c9B.js";
import { a as require_react, i as require_jsx_runtime } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
import { l as requeueUnreviewedTransactions } from "./db-BP1alSrj.js";
import { t as Button } from "./button-h36q7tklakhd38nx-D4x2gb7U.js";
//#region src/routes/controls.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ControlsPage() {
	const [status, setStatus] = (0, import_react.useState)("");
	const [isQueueing, setIsQueueing] = (0, import_react.useState)(false);
	const handleRequeue = async () => {
		setIsQueueing(true);
		setStatus("");
		try {
			const result = await requeueUnreviewedTransactions();
			setStatus(result);
		} finally {
			setIsQueueing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-standard-width",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "Controls"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleRequeue,
					disabled: isQueueing,
					children: isQueueing ? "Re-queueing…" : "Re-queue un-reviewed transactions"
				})
			}),
			status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: status
			})
		]
	});
}
//#endregion
export { ControlsPage as component };
