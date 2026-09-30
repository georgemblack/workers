import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D2RmOqCv.js";
import { a as getRules } from "./db-BP1alSrj.js";
//#region src/routes/rules.tsx
var $$splitComponentImporter = () => import("./rules-K7_UJbxS.js");
var Route = createFileRoute("/rules")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => await getRules()
});
//#endregion
export { Route as t };
