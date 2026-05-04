#!/usr/bin/env node
// Generate an ES256 (P-256) JWK for the IdP signing key.
// Output: a single-line JSON JWK suitable for `wrangler secret put SIGNING_JWK`.

import { generateKeyPairSync, randomBytes } from "node:crypto";

const { publicKey, privateKey } = generateKeyPairSync("ec", {
  namedCurve: "P-256",
});

const jwk = privateKey.export({ format: "jwk" });
jwk.kid = randomBytes(8).toString("hex");
jwk.alg = "ES256";
jwk.use = "sig";

const publicJwk = publicKey.export({ format: "jwk" });
publicJwk.kid = jwk.kid;
publicJwk.alg = "ES256";
publicJwk.use = "sig";

console.error(
  "# Public JWK (for reference; published at /.well-known/jwks.json):",
);
console.error(JSON.stringify(publicJwk, null, 2));
console.error("");
console.error("# Private JWK — pipe to: wrangler secret put SIGNING_JWK");
process.stdout.write(JSON.stringify(jwk));
