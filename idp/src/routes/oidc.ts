import { Hono, type Context } from "hono";
import { deleteCookie } from "hono/cookie";
import {
  consumeAuthCode,
  consumeRefreshToken,
  getClient,
  hashSecret,
  putAuthCode,
  putRefreshToken,
  type AuthCodeRecord,
} from "../storage";
import { loadSigningKey, signJwt } from "../keys";
import {
  getSession,
  setTxCookie,
  readTxCookie,
  clearTxCookie,
} from "../session";
import {
  constantTimeEqual,
  nowSeconds,
  randomToken,
  sha256Base64url,
} from "../util";

type Ctx = Context<{ Bindings: Cloudflare.Env }>;

const PENDING_AUTH_COOKIE = "pending_auth";

export const oidc = new Hono<{ Bindings: Cloudflare.Env }>();

oidc.get("/.well-known/openid-configuration", async (c) => {
  const issuer = c.env.ISSUER;
  return c.json({
    issuer,
    authorization_endpoint: `${issuer}/authorize`,
    token_endpoint: `${issuer}/token`,
    userinfo_endpoint: `${issuer}/userinfo`,
    jwks_uri: `${issuer}/.well-known/jwks.json`,
    end_session_endpoint: `${issuer}/logout`,
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["ES256"],
    scopes_supported: ["openid", "profile", "email", "offline_access"],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "none",
    ],
    code_challenge_methods_supported: ["S256"],
    authorization_response_iss_parameter_supported: true,
    claims_supported: [
      "sub",
      "iss",
      "aud",
      "exp",
      "iat",
      "auth_time",
      "nonce",
      "name",
      "preferred_username",
      "email",
    ],
  });
});

oidc.get("/.well-known/jwks.json", async (c) => {
  const key = await loadSigningKey(c.env);
  return c.json({ keys: [key.publicJwk] });
});

interface PendingAuth {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state?: string;
  nonce?: string;
  code_challenge: string;
  code_challenge_method: string;
}

oidc.get("/authorize", async (c) => {
  const url = new URL(c.req.url);
  const params = url.searchParams;
  const client_id = params.get("client_id") ?? "";
  const redirect_uri = params.get("redirect_uri") ?? "";
  const response_type = params.get("response_type") ?? "";
  const scope = params.get("scope") ?? "";
  const state = params.get("state") ?? undefined;
  const nonce = params.get("nonce") ?? undefined;
  const code_challenge = params.get("code_challenge") ?? "";
  const code_challenge_method = params.get("code_challenge_method") ?? "";
  const prompt = params.get("prompt") ?? undefined;
  const max_age = params.get("max_age");

  const client = await getClient(c.env.DB, client_id);
  if (!client) {
    return c.text("invalid_client: unknown client_id", 400);
  }
  if (!client.redirect_uris.includes(redirect_uri)) {
    return c.text("invalid_request: redirect_uri not registered", 400);
  }
  if (response_type !== "code") {
    return errorRedirect(c, redirect_uri, "unsupported_response_type", state);
  }
  if (!scope.split(" ").includes("openid")) {
    return errorRedirect(c, redirect_uri, "invalid_scope", state);
  }
  if (!code_challenge || code_challenge_method !== "S256") {
    return errorRedirect(
      c,
      redirect_uri,
      "invalid_request",
      state,
      "PKCE S256 required",
    );
  }

  const pending: PendingAuth = {
    client_id,
    redirect_uri,
    response_type,
    scope,
    state,
    nonce,
    code_challenge,
    code_challenge_method,
  };

  const session = await getSession(c);
  const sessionAge = session ? nowSeconds() - session.iat : Infinity;
  const needsLogin =
    !session ||
    prompt === "login" ||
    (max_age !== null && sessionAge > parseInt(max_age, 10));

  if (needsLogin) {
    await setTxCookie(c, PENDING_AUTH_COOKIE, pending, 600);
    return c.redirect("/login?next=/authorize/continue");
  }

  return await issueCodeAndRedirect(c, pending, session!.sub, session!.iat);
});

oidc.get("/authorize/continue", async (c) => {
  const session = await getSession(c);
  if (!session) return c.redirect("/login");
  const pending = await readTxCookie<PendingAuth>(c, PENDING_AUTH_COOKIE);
  if (!pending) return c.text("No pending authorization", 400);
  clearTxCookie(c, PENDING_AUTH_COOKIE);
  return await issueCodeAndRedirect(c, pending, session.sub, session.iat);
});

async function issueCodeAndRedirect(
  c: Ctx,
  pending: PendingAuth,
  sub: string,
  authTime: number,
): Promise<Response> {
  const code = randomToken(32);
  const record: AuthCodeRecord = {
    client_id: pending.client_id,
    redirect_uri: pending.redirect_uri,
    scope: pending.scope,
    nonce: pending.nonce,
    code_challenge: pending.code_challenge,
    code_challenge_method: "S256",
    sub,
    auth_time: authTime,
  };
  const ttl = parseInt(c.env.AUTH_CODE_TTL_SECONDS, 10);
  await putAuthCode(c.env.DB, code, record, ttl);

  const url = new URL(pending.redirect_uri);
  url.searchParams.set("code", code);
  url.searchParams.set("iss", c.env.ISSUER);
  if (pending.state) url.searchParams.set("state", pending.state);
  return c.redirect(url.toString());
}

function errorRedirect(
  c: Ctx,
  redirect_uri: string,
  error: string,
  state?: string,
  description?: string,
): Response {
  const url = new URL(redirect_uri);
  url.searchParams.set("error", error);
  if (description) url.searchParams.set("error_description", description);
  url.searchParams.set("iss", c.env.ISSUER);
  if (state) url.searchParams.set("state", state);
  return Response.redirect(url.toString(), 302);
}

oidc.post("/token", async (c) => {
  const body = await c.req.parseBody();
  const grant_type = String(body.grant_type ?? "");

  const auth = await authenticateClient(c, body);
  if (!auth.ok) {
    return c.json(
      { error: "invalid_client", error_description: auth.error },
      401,
    );
  }
  const client = auth.client;

  if (grant_type === "authorization_code") {
    const code = String(body.code ?? "");
    const redirect_uri = String(body.redirect_uri ?? "");
    const code_verifier = String(body.code_verifier ?? "");

    const record = await consumeAuthCode(c.env.DB, code);
    if (!record) {
      return c.json(
        {
          error: "invalid_grant",
          error_description: "code invalid or expired",
        },
        400,
      );
    }
    if (record.client_id !== client.client_id) {
      return c.json(
        { error: "invalid_grant", error_description: "client mismatch" },
        400,
      );
    }
    if (record.redirect_uri !== redirect_uri) {
      return c.json(
        { error: "invalid_grant", error_description: "redirect_uri mismatch" },
        400,
      );
    }
    const challenge = await sha256Base64url(code_verifier);
    if (!constantTimeEqual(challenge, record.code_challenge)) {
      return c.json(
        { error: "invalid_grant", error_description: "PKCE failed" },
        400,
      );
    }

    return await issueTokens(c, {
      client_id: client.client_id,
      sub: record.sub,
      scope: record.scope,
      auth_time: record.auth_time,
      nonce: record.nonce,
    });
  }

  if (grant_type === "refresh_token") {
    const refresh_token = String(body.refresh_token ?? "");
    const record = await consumeRefreshToken(c.env.DB, refresh_token);
    if (!record) {
      return c.json({ error: "invalid_grant" }, 400);
    }
    if (record.client_id !== client.client_id) {
      return c.json({ error: "invalid_grant" }, 400);
    }
    const requestedScope = body.scope ? String(body.scope) : record.scope;
    const allowed = record.scope.split(" ");
    for (const s of requestedScope.split(" ")) {
      if (!allowed.includes(s)) {
        return c.json({ error: "invalid_scope" }, 400);
      }
    }
    return await issueTokens(c, {
      client_id: client.client_id,
      sub: record.sub,
      scope: requestedScope,
      auth_time: record.auth_time,
      nonce: record.nonce,
    });
  }

  return c.json({ error: "unsupported_grant_type" }, 400);
});

async function authenticateClient(
  c: Ctx,
  body: Record<string, string | File>,
): Promise<
  | { ok: true; client: NonNullable<Awaited<ReturnType<typeof getClient>>> }
  | { ok: false; error: string }
> {
  const authHeader = c.req.header("authorization");
  let client_id: string | undefined;
  let client_secret: string | undefined;

  if (authHeader?.toLowerCase().startsWith("basic ")) {
    try {
      const decoded = atob(authHeader.slice(6));
      const [id, ...rest] = decoded.split(":");
      client_id = id;
      client_secret = rest.join(":");
    } catch {
      return { ok: false, error: "malformed Authorization header" };
    }
  } else {
    if (body.client_id) client_id = String(body.client_id);
    if (body.client_secret) client_secret = String(body.client_secret);
  }

  if (!client_id) return { ok: false, error: "missing client_id" };
  const client = await getClient(c.env.DB, client_id);
  if (!client) return { ok: false, error: "unknown client" };

  if (client.token_endpoint_auth_method === "none") {
    return { ok: true, client };
  }
  if (!client_secret) return { ok: false, error: "missing client_secret" };
  const provided = await hashSecret(client_secret);
  if (
    !client.client_secret_hash ||
    !constantTimeEqual(provided, client.client_secret_hash)
  ) {
    return { ok: false, error: "invalid client_secret" };
  }
  return { ok: true, client };
}

async function issueTokens(
  c: Ctx,
  args: {
    client_id: string;
    sub: string;
    scope: string;
    auth_time: number;
    nonce?: string;
  },
): Promise<Response> {
  const accessTtl = parseInt(c.env.ACCESS_TOKEN_TTL_SECONDS, 10);
  const idTtl = parseInt(c.env.ID_TOKEN_TTL_SECONDS, 10);
  const refreshTtl = parseInt(c.env.REFRESH_TOKEN_TTL_SECONDS, 10);

  const access_token = await signJwt(
    c.env,
    {
      iss: c.env.ISSUER,
      sub: args.sub,
      aud: args.client_id,
      scope: args.scope,
      token_use: "access",
    },
    accessTtl,
  );

  const id_token_payload: Record<string, unknown> = {
    iss: c.env.ISSUER,
    sub: args.sub,
    aud: args.client_id,
    auth_time: args.auth_time,
  };
  if (args.nonce) id_token_payload.nonce = args.nonce;
  for (const [k, v] of Object.entries(claimsForScope(c.env, args.scope))) {
    id_token_payload[k] = v;
  }
  const id_token = await signJwt(c.env, id_token_payload, idTtl);

  const response: Record<string, unknown> = {
    access_token,
    token_type: "Bearer",
    expires_in: accessTtl,
    id_token,
    scope: args.scope,
  };

  if (args.scope.split(" ").includes("offline_access")) {
    const refresh_token = randomToken(48);
    await putRefreshToken(
      c.env.DB,
      refresh_token,
      {
        client_id: args.client_id,
        scope: args.scope,
        sub: args.sub,
        auth_time: args.auth_time,
        nonce: args.nonce,
      },
      refreshTtl,
    );
    response.refresh_token = refresh_token;
  }

  return new Response(JSON.stringify(response), {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      pragma: "no-cache",
    },
  });
}

function claimsForScope(
  env: Cloudflare.Env,
  scope: string,
): Record<string, unknown> {
  const scopes = new Set(scope.split(" "));
  const out: Record<string, unknown> = {};
  if (scopes.has("profile")) {
    out.name = env.USER_DISPLAY_NAME;
    out.preferred_username = env.USER_NAME;
  }
  if (scopes.has("email")) {
    out.email = env.USER_EMAIL;
    out.email_verified = true;
  }
  return out;
}

oidc.get("/userinfo", (c) => userinfo(c));
oidc.post("/userinfo", (c) => userinfo(c));

async function userinfo(c: Ctx): Promise<Response> {
  const auth = c.req.header("authorization");
  if (!auth?.toLowerCase().startsWith("bearer ")) {
    return invalidToken("missing bearer token");
  }
  const token = auth.slice(7);
  let payload: Record<string, unknown>;
  try {
    const { jwtVerify } = await import("jose");
    const key = await loadSigningKey(c.env);
    const { payload: p } = await jwtVerify(token, key.publicKey, {
      issuer: c.env.ISSUER,
    });
    payload = p as Record<string, unknown>;
  } catch {
    return invalidToken("token verification failed");
  }

  if (payload.token_use !== "access") {
    return invalidToken("not an access token");
  }
  const aud = typeof payload.aud === "string" ? payload.aud : null;
  if (!aud || !(await getClient(c.env.DB, aud))) {
    return invalidToken("unknown audience");
  }

  const sub = String(payload.sub);
  const scope = String(payload.scope ?? "");
  return c.json({
    sub,
    ...claimsForScope(c.env, scope),
  });
}

function invalidToken(description: string): Response {
  return new Response("", {
    status: 401,
    headers: {
      "www-authenticate": `Bearer error="invalid_token", error_description="${description}"`,
    },
  });
}

oidc.get("/logout", async (c) => {
  const url = new URL(c.req.url);
  const post_logout_redirect_uri = url.searchParams.get(
    "post_logout_redirect_uri",
  );
  const state = url.searchParams.get("state");
  const id_token_hint = url.searchParams.get("id_token_hint");

  let allowedRedirect: string | null = null;
  if (post_logout_redirect_uri && id_token_hint) {
    try {
      const { jwtVerify, errors } = await import("jose");
      const key = await loadSigningKey(c.env);
      let claims: Record<string, unknown>;
      try {
        ({ payload: claims } = await jwtVerify(
          id_token_hint,
          key.publicKey,
          { issuer: c.env.ISSUER },
        ));
      } catch (e) {
        // ID token hints are by definition stale — accept an expired token
        // as long as the signature and issuer are valid.
        if (e instanceof errors.JWTExpired) {
          claims = e.payload;
        } else {
          throw e;
        }
      }
      const rawAud = claims.aud;
      const aud =
        typeof rawAud === "string"
          ? rawAud
          : Array.isArray(rawAud) && typeof rawAud[0] === "string"
            ? rawAud[0]
            : null;
      if (aud) {
        const client = await getClient(c.env.DB, aud);
        if (
          client &&
          client.post_logout_redirect_uris.includes(post_logout_redirect_uri)
        ) {
          allowedRedirect = post_logout_redirect_uri;
        }
      }
    } catch {
      // ignore
    }
  }

  deleteCookie(c, "idp_session", { path: "/" });

  if (allowedRedirect) {
    const u = new URL(allowedRedirect);
    if (state) u.searchParams.set("state", state);
    return c.redirect(u.toString());
  }
  return c.html(
    `<!doctype html><meta charset="utf-8"><title>Signed out</title><body style="font-family:system-ui;padding:2rem"><h1>Signed out</h1><p>You have been signed out.</p></body>`,
  );
});
