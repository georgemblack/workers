import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-_qmadsC3.js";
import { env } from "cloudflare:workers";
//#region node_modules/.pnpm/@tanstack+start-server-core@1.169.30/node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/data/db.ts?tss-serverfn-split
var listLinks_createServerFn_handler = createServerRpc({
	id: "1d7005a87981f1cef5f206209b7b8e033038a605f49a1aa59d5b9483ed124020",
	name: "listLinks",
	filename: "src/data/db.ts"
}, (opts) => listLinks.__executeServer(opts));
var listLinks = createServerFn({ method: "GET" }).handler(listLinks_createServerFn_handler, async () => {
	return (await env.DB.prepare("SELECT id, url, title, description, created_at FROM links ORDER BY created_at DESC LIMIT 100").all()).results;
});
var deleteLink_createServerFn_handler = createServerRpc({
	id: "88ef454a22eebef6de59126acc933d0e997c05fc022184f0769c934bd0e8b9eb",
	name: "deleteLink",
	filename: "src/data/db.ts"
}, (opts) => deleteLink.__executeServer(opts));
var deleteLink = createServerFn({ method: "POST" }).validator((id) => id).handler(deleteLink_createServerFn_handler, async ({ data: id }) => {
	await env.DB.prepare("DELETE FROM links WHERE id = ?").bind(id).run();
});
var addLink_createServerFn_handler = createServerRpc({
	id: "04dfd9f55402838e315b30a6610309b0cb0619b1887153a5559b736f7afd163e",
	name: "addLink",
	filename: "src/data/db.ts"
}, (opts) => addLink.__executeServer(opts));
var addLink = createServerFn({ method: "POST" }).validator((url) => url).handler(addLink_createServerFn_handler, async ({ data: url }) => {
	await env.LINK_QUEUE.send({ url });
});
//#endregion
export { addLink_createServerFn_handler, deleteLink_createServerFn_handler, listLinks_createServerFn_handler };
