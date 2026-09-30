import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-TpCK4c9B.js";
import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-BYta9PPk.js";
//#region node_modules/.pnpm/@tanstack+start-server-core@1.169.30/node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/data/db.ts
var getMerchants = createServerFn({ method: "GET" }).handler(createSsrRpc("e04f692d7adf52ccd7b04b1cdc1b5e4ca6380ab95bf444ebb6f99387d4ae5ef5"));
var getRule = createServerFn({ method: "GET" }).validator((merchant) => merchant).handler(createSsrRpc("9f0cb89c18f3e088b89ebcc789a9ae4e82f4f4154ec12a00a6a9fa8d43a8978c"));
var getRules = createServerFn({ method: "GET" }).handler(createSsrRpc("c01549b280dea00deadc12d6d1c788b8900c639d3ec9fdf2ff9543306074c31f"));
var saveRule = createServerFn({ method: "POST" }).validator((rule) => rule).handler(createSsrRpc("9cacadc3b6645f00c41feac15ea6b3a5d0031272c9421670cd80548f06cf18a3"));
var deleteRule = createServerFn({ method: "POST" }).validator((id) => id).handler(createSsrRpc("b677081ebc70ece16f17c515ee08eb90665546835fe7514659e60d0995d247fc"));
var getTransactions = createServerFn({ method: "GET" }).validator((filter) => filter).handler(createSsrRpc("a0913d583c2792770ce9c60f7c3c951275381030ca01103bd8c9b456e014fabd"));
var saveTransaction = createServerFn({ method: "POST" }).validator((tx) => tx).handler(createSsrRpc("ff16b5c7e12c82fff015cd7e021ba76974ead0a16668dfe0e0e16bfc4d8a941a"));
var importCSV = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("fb9b23783c0cbee97ae260bf0572799a93bc4f00ca2ab22ca007903a2ab07086"));
var requeueUnreviewedTransactions = createServerFn({ method: "POST" }).handler(createSsrRpc("f67e3fec101e7d2a979ca15dfad88218ccb80046286a8e6190709bb7ab5aac1e"));
var updateTransaction = createServerFn({ method: "POST" }).validator((tx) => tx).handler(createSsrRpc("86ed5591308b5d9fd9ff5d99bbce7a9636e536d83ffbfbfc4497956b7829acae"));
var deleteTransaction = createServerFn({ method: "POST" }).validator((id) => id).handler(createSsrRpc("85b30c18782205bb0db0c48fae137c70c1396a471a6f6bfd1774ba6baa6a8a8b"));
var getSummary = createServerFn({ method: "GET" }).validator((year) => year).handler(createSsrRpc("ede875e3001df9ff903f1c674ccadc62b3cac2e5242da99427ffd73f8cffaadc"));
//#endregion
export { getRules as a, importCSV as c, saveTransaction as d, updateTransaction as f, getRule as i, requeueUnreviewedTransactions as l, deleteTransaction as n, getSummary as o, getMerchants as r, getTransactions as s, deleteRule as t, saveRule as u };
