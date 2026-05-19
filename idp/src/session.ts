import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import type { Context } from "hono";
import { SESSION_TTL_SECONDS } from "./constants";
import { base64urlDecode, base64urlEncode, constantTimeEqual } from "./util";

const SESSION_COOKIE = "idp_session";
const TX_COOKIE_PREFIX = "idp_tx_";

async function hmacKey(secret: string): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(secret: string, payload: string): Promise<string> {
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return base64urlEncode(new Uint8Array(sig));
}

export async function encodeSigned(
  secret: string,
  data: unknown,
): Promise<string> {
  const payload = base64urlEncode(JSON.stringify(data));
  const sig = await sign(secret, payload);
  return `${payload}.${sig}`;
}

export async function decodeSigned<T = unknown>(
  secret: string,
  token: string | undefined,
): Promise<T | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await sign(secret, payload);
  if (!constantTimeEqual(expected, sig)) return null;
  try {
    const json = new TextDecoder().decode(base64urlDecode(payload));
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

interface SessionData {
  sub: string;
  iat: number;
  exp: number;
}

export async function createSession(
  c: Context<{ Bindings: Cloudflare.Env }>,
  sub: string,
): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const data: SessionData = {
    sub,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };
  const token = await encodeSigned(c.env.SESSION_SECRET, data);
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function getSession(
  c: Context<{ Bindings: Cloudflare.Env }>,
): Promise<SessionData | null> {
  const token = getCookie(c, SESSION_COOKIE);
  const data = await decodeSigned<SessionData>(c.env.SESSION_SECRET, token);
  if (!data) return null;
  if (data.exp < Math.floor(Date.now() / 1000)) return null;
  return data;
}

export function destroySession(c: Context<{ Bindings: Cloudflare.Env }>): void {
  deleteCookie(c, SESSION_COOKIE, { path: "/" });
}

export async function setTxCookie(
  c: Context<{ Bindings: Cloudflare.Env }>,
  name: string,
  value: unknown,
  maxAge = 600,
): Promise<void> {
  const token = await encodeSigned(c.env.SESSION_SECRET, value);
  setCookie(c, TX_COOKIE_PREFIX + name, token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    path: "/",
    maxAge,
  });
}

export async function readTxCookie<T = unknown>(
  c: Context<{ Bindings: Cloudflare.Env }>,
  name: string,
): Promise<T | null> {
  const token = getCookie(c, TX_COOKIE_PREFIX + name);
  return decodeSigned<T>(c.env.SESSION_SECRET, token);
}

export function clearTxCookie(
  c: Context<{ Bindings: Cloudflare.Env }>,
  name: string,
): void {
  deleteCookie(c, TX_COOKIE_PREFIX + name, { path: "/" });
}
