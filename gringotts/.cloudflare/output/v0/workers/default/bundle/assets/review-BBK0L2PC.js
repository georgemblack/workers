import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D2RmOqCv.js";
import { r as getMerchants, s as getTransactions } from "./db-BP1alSrj.js";
//#region src/routes/review.tsx
var $$splitComponentImporter = () => import("./review-DFvrLXw9.js");
var Route = createFileRoute("/review")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		const [transactions, merchants] = await Promise.all([getTransactions({ data: { reviewed: false } }), getMerchants()]);
		return {
			transactions,
			merchants
		};
	}
});
//#endregion
export { Route as t };
