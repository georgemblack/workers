import { t as createMiddleware } from "./createMiddleware-CVmn2f4F.js";
import { env } from "cloudflare:workers";
//#region node_modules/.pnpm/@tanstack+start-client-core@1.170.26/node_modules/@tanstack/start-client-core/dist/esm/createStart.js
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
var createStart = (getOptions) => {
	return {
		getOptions: async () => {
			const options = await getOptions();
			if (options.serializationAdapters) {
				const deduped = /* @__PURE__ */ new Set();
				dedupeSerializationAdapters(deduped, options.serializationAdapters);
				options.serializationAdapters = Array.from(deduped);
			}
			return options;
		},
		createMiddleware
	};
};
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var strictDecoder = new TextDecoder("utf-8", { fatal: true });
function concat(...buffers) {
	const size = buffers.reduce((acc, { length }) => acc + length, 0);
	const buf = new Uint8Array(size);
	let i = 0;
	for (const buffer of buffers) {
		buf.set(buffer, i);
		i += buffer.length;
	}
	return buf;
}
function encode(string) {
	const bytes = new Uint8Array(string.length);
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		if (code > 127) throw new TypeError("non-ASCII string encountered in encode()");
		bytes[i] = code;
	}
	return bytes;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/crypto_key.js
var unusable = (name, prop = "algorithm.name") => /* @__PURE__ */ new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
function checkUsage(key, usage) {
	if (usage && !key.usages.includes(usage)) throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
}
function checkModulusLength(alg, key) {
	const { modulusLength } = key.algorithm;
	if (typeof modulusLength !== "number" || modulusLength < 2048) throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
}
function checkCryptoKey(key, expected, usage) {
	const algorithm = key.algorithm;
	if (algorithm.name !== expected.name) throw unusable(expected.name);
	if (expected.hash && algorithm.hash?.name !== expected.hash) throw unusable(expected.hash, "algorithm.hash");
	if (expected.namedCurve && algorithm.namedCurve !== expected.namedCurve) throw unusable(expected.namedCurve, "algorithm.namedCurve");
	if (expected.length !== void 0 && algorithm.length !== expected.length) throw unusable(expected.length, "algorithm.length");
	checkUsage(key, usage);
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/invalid_key_input.js
function message(msg, actual, ...types) {
	if (types.length > 2) {
		const last = types.pop();
		msg += `one of type ${types.join(", ")}, or ${last}.`;
	} else if (types.length === 2) msg += `one of type ${types[0]} or ${types[1]}.`;
	else msg += `of type ${types[0]}.`;
	if (actual == null) msg += ` Received ${actual}`;
	else if (typeof actual === "function" && actual.name) msg += ` Received function ${actual.name}`;
	else if (typeof actual === "object" && actual != null) {
		if (actual.constructor?.name) msg += ` Received an instance of ${actual.constructor.name}`;
	}
	return msg;
}
var withAlg = (alg, actual, ...types) => message(`Key for the ${alg} algorithm must be `, actual, ...types);
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/util/errors.js
var JOSEError = class extends Error {
	static code = "ERR_JOSE_GENERIC";
	code = "ERR_JOSE_GENERIC";
	constructor(message, options) {
		super(message, options);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
};
var JWTClaimValidationFailed = class extends JOSEError {
	static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	claim;
	reason;
	payload;
	constructor(message, payload, claim = "unspecified", reason = "unspecified") {
		super(message, { cause: {
			claim,
			reason,
			payload
		} });
		this.claim = claim;
		this.reason = reason;
		this.payload = payload;
	}
};
var JWTExpired = class extends JOSEError {
	static code = "ERR_JWT_EXPIRED";
	code = "ERR_JWT_EXPIRED";
	claim;
	reason;
	payload;
	constructor(message, payload, claim = "unspecified", reason = "unspecified") {
		super(message, { cause: {
			claim,
			reason,
			payload
		} });
		this.claim = claim;
		this.reason = reason;
		this.payload = payload;
	}
};
var JOSEAlgNotAllowed = class extends JOSEError {
	static code = "ERR_JOSE_ALG_NOT_ALLOWED";
	code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
	static code = "ERR_JOSE_NOT_SUPPORTED";
	code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWSInvalid = class extends JOSEError {
	static code = "ERR_JWS_INVALID";
	code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
	static code = "ERR_JWT_INVALID";
	code = "ERR_JWT_INVALID";
};
var JWKSInvalid = class extends JOSEError {
	static code = "ERR_JWKS_INVALID";
	code = "ERR_JWKS_INVALID";
};
var JWKSNoMatchingKey = class extends JOSEError {
	static code = "ERR_JWKS_NO_MATCHING_KEY";
	code = "ERR_JWKS_NO_MATCHING_KEY";
	constructor(message = "no applicable key found in the JSON Web Key Set", options) {
		super(message, options);
	}
};
var JWKSMultipleMatchingKeys = class extends JOSEError {
	[Symbol.asyncIterator] = async function* () {};
	static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	constructor(message = "multiple matching keys found in the JSON Web Key Set", options) {
		super(message, options);
	}
};
var JWKSTimeout = class extends JOSEError {
	static code = "ERR_JWKS_TIMEOUT";
	code = "ERR_JWKS_TIMEOUT";
	constructor(message = "request timed out", options) {
		super(message, options);
	}
};
var JWSSignatureVerificationFailed = class extends JOSEError {
	static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	constructor(message = "signature verification failed", options) {
		super(message, options);
	}
};
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/is_key_like.js
var isCryptoKey = (key) => {
	if (key?.[Symbol.toStringTag] === "CryptoKey") return true;
	try {
		return key instanceof CryptoKey;
	} catch {
		return false;
	}
};
var isKeyObject = (key) => key?.[Symbol.toStringTag] === "KeyObject";
var isKeyLike = (key) => isCryptoKey(key) || isKeyObject(key);
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/base64.js
function decodeBase64(encoded) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(encoded);
	const binary = atob(encoded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/util/base64url.js
var invalid = "The input to be decoded is not correctly encoded.";
function decode(input) {
	if (Uint8Array.fromBase64) try {
		return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), { alphabet: "base64url" });
	} catch (cause) {
		throw new TypeError(invalid, { cause });
	}
	let encoded = input;
	if (encoded instanceof Uint8Array) encoded = decoder.decode(encoded);
	if (encoded.includes("+") || encoded.includes("/")) throw new TypeError(invalid);
	encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
	try {
		return decodeBase64(encoded);
	} catch {
		throw new TypeError(invalid);
	}
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/type_checks.js
function isObject(input) {
	if (typeof input !== "object" || input === null || Object.prototype.toString.call(input) !== "[object Object]") return false;
	const prototype = Object.getPrototypeOf(input);
	if (prototype === null) return true;
	let proto = prototype;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return prototype === proto;
}
function isDisjoint(...headers) {
	const parameters = /* @__PURE__ */ new Set();
	for (const header of headers) {
		if (!header) continue;
		for (const parameter of Object.keys(header)) {
			if (parameters.has(parameter)) return false;
			parameters.add(parameter);
		}
	}
	return true;
}
var isJWK = (key) => isObject(key) && typeof key.kty === "string";
var isPrivateJWK = (key) => key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string");
var isPublicJWK = (key) => key.kty !== "oct" && key.d === void 0 && key.priv === void 0;
var isSecretJWK = (key) => key.kty === "oct" && typeof key.k === "string";
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/helpers.js
function decodeBase64url(value, label, ErrorClass) {
	try {
		return decode(value);
	} catch {
		throw new ErrorClass(`Failed to base64url decode the ${label}`);
	}
}
function encodeBase64url(value, label, ErrorClass) {
	try {
		return encode(value);
	} catch {
		throw new ErrorClass(`The ${label} is not a valid base64url string`);
	}
}
function parseJoseHeader(b64, ErrorClass, message) {
	let parsed;
	try {
		parsed = JSON.parse(strictDecoder.decode(decode(b64)));
	} catch {
		throw new ErrorClass(message);
	}
	if (!isObject(parsed)) throw new ErrorClass(message);
	return parsed;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/jwk_to_key.js
async function jwkToKey(entry, jwk) {
	if (jwk.kty === "RSA" && "oth" in jwk && jwk.oth !== void 0) throw new JOSENotSupported("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
	if (!entry.kty.includes(jwk.kty)) throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
	const algorithm = entry.resolve?.({
		kty: jwk.kty,
		crv: jwk.crv
	}) ?? entry.subtle;
	const isPrivate = !!(jwk.d || jwk.priv);
	const keyData = { ...jwk };
	if (keyData.kty !== "AKP") delete keyData.alg;
	delete keyData.use;
	return crypto.subtle.importKey("jwk", keyData, algorithm, jwk.ext ?? !isPrivate, jwk.key_ops ?? entry.usages[isPrivate ? 1 : 0]);
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/key.js
var tag = (key) => key[Symbol.toStringTag];
var jwkMatchesOp = (entry, key, usage) => {
	const { alg } = entry;
	if (key.use !== void 0) {
		const expected = usage === "sign" || usage === "verify" ? "sig" : "enc";
		if (key.use !== expected) throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
	}
	if (key.alg !== void 0 && key.alg !== alg) throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg}" when present`);
	if (Array.isArray(key.key_ops)) {
		const expectedKeyOp = usage === "encrypt" || usage === "decrypt" ? entry.ops?.[usage === "encrypt" ? 0 : 1] : usage;
		if (expectedKeyOp && !key.key_ops.includes(expectedKeyOp)) throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
	}
};
function checkKeyType(entry, key, usage) {
	const { alg, secret } = entry;
	const privateKey = usage === "decrypt" || usage === "sign";
	if (secret && key instanceof Uint8Array) return [BYTES, key];
	if (isJWK(key)) {
		if (secret ? !isSecretJWK(key) : !(privateKey ? isPrivateJWK(key) : isPublicJWK(key))) throw new TypeError(secret ? `JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present` : `JSON Web Key for this operation must be a ${privateKey ? "private" : "public"} JWK`);
		jwkMatchesOp(entry, key, usage);
		return [JWK, key];
	}
	if (!isKeyLike(key)) throw new TypeError(secret ? withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array") : withAlg(alg, key, "CryptoKey", "KeyObject", "JSON Web Key"));
	if (secret) {
		if (key.type !== "secret") throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
	} else {
		if (key.type === "secret") throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
		const expectedType = privateKey ? "private" : "public";
		if ((key.type === "public" || key.type === "private") && key.type !== expectedType) {
			const operation = usage === "sign" ? "signing" : usage === "verify" ? "verifying" : `${usage.slice(0, -1)}tion`;
			throw new TypeError(`${tag(key)} instances for asymmetric algorithm ${operation} must be of type "${expectedType}"`);
		}
	}
	return isCryptoKey(key) ? [CRYPTO, key] : [KEYOBJECT, key];
}
var BYTES = 0;
var CRYPTO = 1;
var KEYOBJECT = 2;
var JWK = 3;
var cache;
var nist = {
	__proto__: null,
	prime256v1: "P-256",
	secp384r1: "P-384",
	secp521r1: "P-521"
};
function cached(key, alg, value) {
	cache ||= /* @__PURE__ */ new WeakMap();
	const entry = cache.get(key);
	if (value) if (entry) entry[alg] = value;
	else cache.set(key, {
		__proto__: null,
		[alg]: value
	});
	return value ?? entry?.[alg];
}
var handleJWK = async (key, jwk, entry) => cached(key, entry.alg) ?? cached(key, entry.alg, await jwkToKey(entry, {
	...jwk,
	alg: entry.alg
}));
var handleKeyObject = (keyObject, entry) => {
	const hit = cached(keyObject, entry.alg);
	if (hit) return hit;
	const isPublic = keyObject.type === "public";
	const usages = entry.usages[isPublic ? 0 : 1];
	const { asymmetricKeyType } = keyObject;
	const crv = nist[keyObject.asymmetricKeyDetails?.namedCurve];
	const params = entry.resolve?.({
		crv,
		asymmetricKeyType
	}) ?? entry.subtle;
	return cached(keyObject, entry.alg, keyObject.toCryptoKey(params, isPublic, usages));
};
async function prepareKey(entry, key, usage) {
	const tagged = checkKeyType(entry, key, usage);
	switch (tagged[0]) {
		case BYTES:
		case CRYPTO: return tagged[1];
		case JWK: {
			const key = tagged[1];
			if (key.k) return decode(key.k);
			if (!Object.isFrozen(key)) {
				const { key_ops } = key;
				if (Array.isArray(key_ops)) Object.freeze(key_ops);
				Object.freeze(key);
			}
			return handleJWK(key, key, entry);
		}
		case KEYOBJECT: {
			const keyObject = tagged[1];
			if (keyObject.type === "secret") return keyObject.export();
			if ("toCryptoKey" in keyObject && typeof keyObject.toCryptoKey === "function") return handleKeyObject(keyObject, entry);
			return handleJWK(keyObject, keyObject.export({ format: "jwk" }), entry);
		}
	}
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/key_descriptor.js
function table(entries) {
	const out = { __proto__: null };
	for (const alg in entries) out[alg] = {
		...entries[alg],
		alg
	};
	return out;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/options.js
var JWS_RECOGNIZED = {
	__proto__: null,
	b64: true
};
function validateAlgorithms(option, algorithms) {
	if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) throw new TypeError(`"${option}" option must be an array of strings`);
	if (!algorithms) return;
	return new Set(algorithms);
}
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
	if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) throw new Err("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!protectedHeader || protectedHeader.crit === void 0) return [];
	if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) throw new Err("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	const recognized = recognizedOption === void 0 ? recognizedDefault : {
		__proto__: null,
		...recognizedOption,
		...recognizedDefault
	};
	for (const parameter of protectedHeader.crit) {
		if (!(parameter in recognized)) throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
		if (!Object.hasOwn(joseHeader, parameter) || joseHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" is missing`);
		if (recognized[parameter] && (!Object.hasOwn(protectedHeader, parameter) || protectedHeader[parameter] === void 0)) throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
	}
	return protectedHeader.crit;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/signing.js
async function getSigKey(entry, key, usage) {
	if (key instanceof Uint8Array) return crypto.subtle.importKey("raw", key, entry.subtle, false, [usage]);
	checkCryptoKey(key, entry.subtle, usage);
	if (entry.minRsaBits) checkModulusLength(entry.alg, key);
	return key;
}
async function verify(entry, key, signature, data) {
	const cryptoKey = await getSigKey(entry, key, "verify");
	try {
		return await crypto.subtle.verify(entry.signing, cryptoKey, signature, data);
	} catch {
		return false;
	}
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/jws_algorithms.js
var sig = [["verify"], ["sign"]];
function hmac(bits) {
	const subtle = {
		name: "HMAC",
		hash: `SHA-${bits}`
	};
	return {
		kty: ["oct"],
		secret: true,
		subtle,
		signing: subtle,
		usages: sig
	};
}
function rsa(bits, saltLength) {
	const subtle = {
		name: saltLength ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
		hash: `SHA-${bits}`
	};
	return {
		kty: ["RSA"],
		subtle,
		signing: saltLength ? {
			...subtle,
			saltLength
		} : subtle,
		usages: sig,
		minRsaBits: 2048
	};
}
function ecdsa(crv, bits) {
	return {
		kty: ["EC"],
		crv,
		subtle: {
			name: "ECDSA",
			namedCurve: crv
		},
		signing: {
			name: "ECDSA",
			hash: `SHA-${bits}`
		},
		usages: sig
	};
}
function eddsa() {
	const subtle = { name: "Ed25519" };
	return {
		kty: ["OKP"],
		crv: "Ed25519",
		subtle,
		signing: subtle,
		usages: sig
	};
}
function mldsa(bits) {
	const subtle = { name: `ML-DSA-${bits}` };
	return {
		kty: ["AKP"],
		subtle,
		signing: subtle,
		usages: sig
	};
}
var JWS = table({
	HS256: hmac(256),
	HS384: hmac(384),
	HS512: hmac(512),
	RS256: rsa(256),
	RS384: rsa(384),
	RS512: rsa(512),
	PS256: rsa(256, 32),
	PS384: rsa(384, 48),
	PS512: rsa(512, 64),
	ES256: ecdsa("P-256", 256),
	ES384: ecdsa("P-384", 384),
	ES512: ecdsa("P-521", 512),
	EdDSA: eddsa(),
	Ed25519: eddsa(),
	"ML-DSA-44": mldsa(44),
	"ML-DSA-65": mldsa(65),
	"ML-DSA-87": mldsa(87)
});
function jwsAlgorithm(alg) {
	const entry = typeof alg === "string" ? JWS[alg] : void 0;
	if (!entry) throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
	return entry;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/jws_verify.js
function prepareVerify(options) {
	return [options && validateAlgorithms("algorithms", options.algorithms), options?.crit];
}
async function verifySignature(jws, shared, key) {
	const { protected: encodedProtected, header, payload: inputPayload } = jws;
	let parsedProt = {};
	if (encodedProtected) parsedProt = parseJoseHeader(encodedProtected, JWSInvalid, "JWS Protected Header is invalid");
	let joseHeader;
	if (header !== void 0) {
		if (!isDisjoint(parsedProt, header)) throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		joseHeader = {
			...parsedProt,
			...header
		};
	} else joseHeader = parsedProt;
	const extensions = validateCrit(JWSInvalid, JWS_RECOGNIZED, shared[1], parsedProt, joseHeader);
	let b64 = true;
	if (extensions.includes("b64")) {
		b64 = parsedProt.b64;
		if (typeof b64 !== "boolean") throw new JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	}
	const { alg } = joseHeader;
	if (typeof alg !== "string" || !alg) throw new JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	if (shared[0] && !shared[0].has(alg)) throw new JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (b64) {
		if (typeof inputPayload !== "string") throw new JWSInvalid("JWS Payload must be a string");
	} else if (typeof inputPayload !== "string" && !(inputPayload instanceof Uint8Array)) throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
	let resolvedKey = false;
	if (typeof key === "function") {
		key = await key(parsedProt, jws);
		resolvedKey = true;
	}
	const entry = jwsAlgorithm(alg);
	const data = concat(encodedProtected !== void 0 ? encode(encodedProtected) : /* @__PURE__ */ new Uint8Array(), encode("."), typeof inputPayload === "string" ? b64 ? shared[2] ??= encodeBase64url(inputPayload, "payload", JWSInvalid) : encoder.encode(inputPayload) : inputPayload);
	const signature = decodeBase64url(jws.signature, "signature", JWSInvalid);
	const k = await prepareKey(entry, key, "verify");
	if (!await verify(entry, k, signature, data)) throw new JWSSignatureVerificationFailed();
	let payload;
	if (b64) payload = decodeBase64url(inputPayload, "payload", JWSInvalid);
	else if (typeof inputPayload === "string") payload = encoder.encode(inputPayload);
	else payload = inputPayload;
	return [
		payload,
		parsedProt,
		b64,
		k,
		resolvedKey
	];
}
async function verifyCompact(jws, shared, key) {
	if (jws instanceof Uint8Array) jws = decoder.decode(jws);
	if (typeof jws !== "string") throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
	const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
	if (length !== 3) throw new JWSInvalid("Invalid Compact JWS");
	return verifySignature({
		payload,
		protected: protectedHeader,
		signature
	}, shared, key);
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var epoch = (date) => Math.floor(date.getTime() / 1e3);
var multipliers = {
	s: 1,
	m: 60,
	h: 3600,
	d: 86400,
	w: 604800,
	y: 31557600
};
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
var checkFailed = "check_failed";
function secs(str) {
	const matched = REGEX.exec(str);
	if (!matched || matched[4] && matched[1]) throw new TypeError("Invalid time period format");
	const value = parseFloat(matched[2]);
	const numericDate = Math.round(value * multipliers[matched[3][0].toLowerCase()]);
	if (matched[1] === "-" || matched[4] === "ago") return -numericDate;
	return numericDate;
}
function validateInput(label, input) {
	if (!Number.isFinite(input)) throw new TypeError(`Invalid ${label} input`);
	return input;
}
var normalizeTyp = (value) => {
	if (value.includes("/")) return value.toLowerCase();
	return `application/${value.toLowerCase()}`;
};
var checkAudiencePresence = (audPayload, audOption) => {
	if (typeof audPayload === "string") return audOption.includes(audPayload);
	if (Array.isArray(audPayload)) return audOption.some((aud) => audPayload.includes(aud));
	return false;
};
function validateNumericDate(payload, claim, required = false) {
	const value = payload[claim];
	if (value === void 0 && !required) return void 0;
	if (typeof value !== "number") throw new JWTClaimValidationFailed(`"${claim}" claim must be a number`, payload, claim, "invalid");
	return value;
}
function unexpectedClaim(payload, claim) {
	throw new JWTClaimValidationFailed(`unexpected "${claim}" claim value`, payload, claim, checkFailed);
}
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
	let payload;
	try {
		payload = JSON.parse(strictDecoder.decode(encodedPayload));
	} catch {}
	if (!isObject(payload)) throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
	const { typ } = options;
	if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) throw new JWTClaimValidationFailed("unexpected \"typ\" JWT header value", payload, "typ", checkFailed);
	const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
	const presenceCheck = [...requiredClaims];
	if (maxTokenAge !== void 0) presenceCheck.push("iat");
	if (audience !== void 0) presenceCheck.push("aud");
	if (subject !== void 0) presenceCheck.push("sub");
	if (issuer !== void 0) presenceCheck.push("iss");
	for (const claim of new Set(presenceCheck.reverse())) if (!Object.hasOwn(payload, claim)) throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
	if (issuer !== void 0 && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) unexpectedClaim(payload, "iss");
	if (subject !== void 0 && payload.sub !== subject) unexpectedClaim(payload, "sub");
	if (audience !== void 0 && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) unexpectedClaim(payload, "aud");
	const { clockTolerance } = options;
	let tolerance = 0;
	if (typeof clockTolerance === "string") tolerance = secs(clockTolerance);
	else if (clockTolerance !== void 0) {
		if (typeof clockTolerance !== "number") throw new TypeError("Invalid clockTolerance option type");
		tolerance = clockTolerance;
	}
	validateInput("clockTolerance option", tolerance);
	const { currentDate } = options;
	const now = validateInput("currentDate option", epoch(currentDate || /* @__PURE__ */ new Date()));
	const iat = validateNumericDate(payload, "iat", maxTokenAge !== void 0);
	const nbf = validateNumericDate(payload, "nbf");
	if (nbf !== void 0) {
		if (nbf > now + tolerance) throw new JWTClaimValidationFailed("\"nbf\" claim timestamp check failed", payload, "nbf", checkFailed);
	}
	const exp = validateNumericDate(payload, "exp");
	if (exp !== void 0) {
		if (exp <= now - tolerance) throw new JWTExpired("\"exp\" claim timestamp check failed", payload, "exp", checkFailed);
	}
	if (maxTokenAge !== void 0) {
		const age = now - iat;
		const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
		if (age - tolerance > max) throw new JWTExpired("\"iat\" claim timestamp check failed (too far in the past)", payload, "iat", checkFailed);
		if (age < 0 - tolerance) throw new JWTClaimValidationFailed("\"iat\" claim timestamp check failed (it should be in the past)", payload, "iat", checkFailed);
	}
	return payload;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/jwt/verify.js
async function jwtVerify(jwt, key, options) {
	const verified = await verifyCompact(jwt, prepareVerify(options), key);
	if (!verified[2]) throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
	const result = {
		payload: validateClaimsSet(verified[1], verified[0], options),
		protectedHeader: verified[1]
	};
	if (typeof key === "function") return {
		...result,
		key: verified[3]
	};
	return result;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/jwks/local.js
function signatureAlgorithm(alg) {
	const entry = typeof alg === "string" ? JWS[alg] : void 0;
	if (!entry || entry.secret) throw new JOSENotSupported("Unsupported \"alg\" value for a JSON Web Key Set");
	return entry;
}
function isJWKSLike(jwks) {
	if (!jwks || typeof jwks !== "object") return false;
	const { keys } = jwks;
	return Array.isArray(keys) && keys.every(isObject);
}
var LocalJWKSetImpl = class {
	#jwks;
	#cached = /* @__PURE__ */ new WeakMap();
	constructor(jwks) {
		if (!isJWKSLike(jwks)) throw new JWKSInvalid("JSON Web Key Set malformed");
		this.#jwks = structuredClone(jwks);
	}
	jwks() {
		return this.#jwks;
	}
	async getKey(protectedHeader, token) {
		const { alg, kid } = {
			...protectedHeader,
			...token?.header
		};
		const entry = signatureAlgorithm(alg);
		const candidates = this.#jwks.keys.filter((jwk) => entry.kty.includes(jwk.kty) && (typeof kid !== "string" || kid === jwk.kid) && (!(typeof jwk.alg === "string" || jwk.kty === "AKP") || alg === jwk.alg) && (typeof jwk.use !== "string" || jwk.use === "sig") && (!Array.isArray(jwk.key_ops) || jwk.key_ops.includes("verify")) && (!entry.crv || jwk.crv === entry.crv));
		const { 0: jwk, length } = candidates;
		if (length === 0) throw new JWKSNoMatchingKey();
		if (length !== 1) {
			const error = new JWKSMultipleMatchingKeys();
			const _cached = this.#cached;
			error[Symbol.asyncIterator] = async function* () {
				for (const jwk of candidates) try {
					yield await importWithAlgCache(_cached, jwk, entry);
				} catch {}
			};
			throw error;
		}
		return importWithAlgCache(this.#cached, jwk, entry);
	}
};
async function importWithAlgCache(cache, jwk, entry) {
	const cached = cache.get(jwk) || cache.set(jwk, { __proto__: null }).get(jwk);
	if (cached[entry.alg] === void 0) {
		const key = await jwkToKey(entry, {
			...jwk,
			alg: entry.alg,
			ext: true
		});
		if (key.type !== "public") throw new JWKSInvalid("JSON Web Key Set members must be public keys");
		cached[entry.alg] = key;
	}
	return cached[entry.alg];
}
function createLocalJWKSet(jwks) {
	const set = new LocalJWKSetImpl(jwks);
	const localJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
	Object.defineProperty(localJWKSet, "jwks", { value: () => structuredClone(set.jwks()) });
	return localJWKSet;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.9/node_modules/jose/dist/webapi/jwks/remote.js
function isCloudflareWorkers() {
	return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
}
var USER_AGENT;
if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) USER_AGENT = `jose/v6.2.9`;
var customFetch = Symbol();
async function fetchJwks(url, headers, signal, fetchImpl = fetch) {
	const response = await fetchImpl(url, {
		method: "GET",
		signal,
		redirect: "manual",
		headers
	}).catch((err) => {
		if (err.name === "TimeoutError") throw new JWKSTimeout();
		throw err;
	});
	if (response.status !== 200) throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
	try {
		return await response.json();
	} catch {
		throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
	}
}
var jwksCache = Symbol();
function isFreshJwksCache(input, cacheMaxAge) {
	if (typeof input !== "object" || input === null) return false;
	if (!("uat" in input) || typeof input.uat !== "number" || Date.now() - input.uat >= cacheMaxAge) return false;
	if (!("jwks" in input) || !isObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isObject)) return false;
	return true;
}
var RemoteJWKSetImpl = class {
	#url;
	#timeoutDuration;
	#cooldownDuration;
	#cacheMaxAge;
	#jwksTimestamp;
	#pendingFetch;
	#headers;
	#customFetch;
	#local;
	#cache;
	constructor(url, options) {
		if (!(url instanceof URL)) throw new TypeError("url must be an instance of URL");
		this.#url = new URL(url.href);
		const opts = options ?? {};
		this.#timeoutDuration = typeof opts.timeoutDuration === "number" ? opts.timeoutDuration : 5e3;
		this.#cooldownDuration = typeof opts.cooldownDuration === "number" ? opts.cooldownDuration : 3e4;
		this.#cacheMaxAge = typeof opts.cacheMaxAge === "number" ? opts.cacheMaxAge : 6e5;
		this.#headers = new Headers(opts.headers);
		if (USER_AGENT && !this.#headers.has("User-Agent")) this.#headers.set("User-Agent", USER_AGENT);
		if (!this.#headers.has("accept")) {
			this.#headers.set("accept", "application/json");
			this.#headers.append("accept", "application/jwk-set+json");
		}
		this.#customFetch = opts[customFetch];
		const cache = opts[jwksCache];
		if (cache !== void 0) {
			this.#cache = cache;
			if (isFreshJwksCache(cache, this.#cacheMaxAge)) {
				this.#jwksTimestamp = this.#cache.uat;
				this.#local = createLocalJWKSet(this.#cache.jwks);
			}
		}
	}
	pendingFetch() {
		return !!this.#pendingFetch;
	}
	#validFor(duration) {
		return typeof this.#jwksTimestamp === "number" && Date.now() < this.#jwksTimestamp + duration;
	}
	coolingDown() {
		return this.#validFor(this.#cooldownDuration);
	}
	fresh() {
		return this.#validFor(this.#cacheMaxAge);
	}
	jwks() {
		return this.#local?.jwks();
	}
	async getKey(protectedHeader, token) {
		if (!this.#local || !this.fresh()) await this.reload();
		try {
			return await this.#local(protectedHeader, token);
		} catch (err) {
			if (err instanceof JWKSNoMatchingKey) {
				if (this.coolingDown() === false) {
					await this.reload();
					return this.#local(protectedHeader, token);
				}
			}
			throw err;
		}
	}
	async reload() {
		if (this.#pendingFetch && isCloudflareWorkers()) this.#pendingFetch = void 0;
		this.#pendingFetch ||= fetchJwks(this.#url.href, this.#headers, AbortSignal.timeout(this.#timeoutDuration), this.#customFetch).then((json) => {
			this.#local = createLocalJWKSet(json);
			if (this.#cache) {
				this.#cache.uat = Date.now();
				this.#cache.jwks = json;
			}
			this.#jwksTimestamp = Date.now();
		}).finally(() => {
			this.#pendingFetch = void 0;
		});
		await this.#pendingFetch;
	}
};
function createRemoteJWKSet(url, options) {
	const set = new RemoteJWKSetImpl(url, options);
	const remoteJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
	Object.defineProperties(remoteJWKSet, {
		coolingDown: {
			get: () => set.coolingDown(),
			enumerable: true
		},
		fresh: {
			get: () => set.fresh(),
			enumerable: true
		},
		reload: {
			value: () => set.reload(),
			enumerable: true
		},
		reloading: {
			get: () => set.pendingFetch(),
			enumerable: true
		},
		jwks: {
			value: () => set.jwks(),
			enumerable: true
		}
	});
	return remoteJWKSet;
}
//#endregion
//#region src/middleware/access.ts
var jwks;
function getJWKS() {
	if (!jwks) jwks = createRemoteJWKSet(new URL(`/cdn-cgi/access/certs`, env.CF_ACCESS_TEAM_DOMAIN));
	return jwks;
}
var accessMiddleware = createMiddleware().server(async ({ next, request }) => {
	const jwt = request.headers.get("Cf-Access-Jwt-Assertion") ?? parseCookie(request.headers.get("Cookie"), "CF_Authorization");
	if (!jwt) throw new Response("Unauthorized", { status: 401 });
	try {
		await jwtVerify(jwt, getJWKS(), {
			audience: env.CF_ACCESS_AUD,
			issuer: env.CF_ACCESS_TEAM_DOMAIN
		});
	} catch {
		throw new Response("Unauthorized", { status: 401 });
	}
	return next();
});
function parseCookie(cookieHeader, name) {
	if (!cookieHeader) return null;
	const match = cookieHeader.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
	return match ? match.slice(name.length + 1) : null;
}
//#endregion
//#region src/start.ts
var startInstance = createStart(() => ({ requestMiddleware: [accessMiddleware] }));
//#endregion
export { startInstance };
