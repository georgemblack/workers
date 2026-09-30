import { n as createFileRoute, t as lazyRouteComponent } from "./lazyRouteComponent-D2RmOqCv.js";
import { r as getMerchants } from "./db-BP1alSrj.js";
//#region src/routes/add.tsx
var $$splitComponentImporter = () => import("./add-BxYGkVlf.js");
var Route = createFileRoute("/add")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return { merchants: await getMerchants() };
	}
});
//#endregion
export { Route as t };
