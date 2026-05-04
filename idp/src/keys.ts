import { SignJWT, importJWK, type JWK } from "jose";

export interface SigningKey {
  privateKey: CryptoKey | Uint8Array;
  publicKey: CryptoKey | Uint8Array;
  publicJwk: JWK;
  kid: string;
  alg: "ES256";
}

let cached: SigningKey | null = null;

export async function loadSigningKey(env: Cloudflare.Env): Promise<SigningKey> {
  if (cached) return cached;
  if (!env.SIGNING_JWK) throw new Error("SIGNING_JWK secret not configured");

  const jwk = JSON.parse(env.SIGNING_JWK) as JWK;
  if (jwk.kty !== "EC" || jwk.crv !== "P-256") {
    throw new Error("SIGNING_JWK must be an ES256 (P-256) JWK");
  }
  if (!jwk.d) throw new Error("SIGNING_JWK must be a private key");

  const privateKey = (await importJWK(jwk, "ES256")) as CryptoKey;
  const publicJwk: JWK = {
    kty: "EC",
    crv: "P-256",
    x: jwk.x,
    y: jwk.y,
    use: "sig",
    alg: "ES256",
    kid: jwk.kid ?? "default",
  };
  const publicKey = (await importJWK(publicJwk, "ES256")) as CryptoKey;
  cached = {
    privateKey,
    publicKey,
    publicJwk,
    kid: publicJwk.kid as string,
    alg: "ES256",
  };
  return cached;
}

export async function signJwt(
  env: Cloudflare.Env,
  payload: Record<string, unknown>,
  ttlSeconds: number,
): Promise<string> {
  const key = await loadSigningKey(env);
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: key.alg, kid: key.kid, typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSeconds)
    .sign(key.privateKey);
}
