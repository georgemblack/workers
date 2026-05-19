import { Hono } from "hono";
import {
  countCredentials,
  deleteCredential,
  listCredentials,
} from "../storage";
import {
  finishAuthentication,
  finishRegistration,
  startAuthentication,
  startRegistration,
} from "../webauthn";
import { createSession, destroySession, getSession } from "../session";
import { constantTimeEqual } from "../util";
import { USER_HANDLE } from "../constants";

export const auth = new Hono<{ Bindings: Cloudflare.Env }>();

auth.get("/api/auth/state", async (c) => {
  const session = await getSession(c);
  const hasCredential = (await countCredentials(c.env.DB)) > 0;
  return c.json({
    authenticated: !!session,
    has_credential: hasCredential,
    user: session ? { sub: session.sub } : null,
  });
});

auth.post("/api/auth/login/options", async (c) => {
  if ((await countCredentials(c.env.DB)) === 0) {
    return c.json({ error: "no_credentials_registered" }, 400);
  }
  const { options, challengeId } = await startAuthentication(c.env);
  return c.json({ options, challengeId });
});

auth.post("/api/auth/login/verify", async (c) => {
  const body = (await c.req.json()) as {
    challengeId: string;
    response: Parameters<typeof finishAuthentication>[2];
  };
  const result = await finishAuthentication(
    c.env,
    body.challengeId,
    body.response,
  );
  if (!result.ok) return c.json({ error: result.error }, 400);
  await createSession(c, result.sub);
  return c.json({ ok: true });
});

auth.post("/api/auth/logout", async (c) => {
  destroySession(c);
  return c.json({ ok: true });
});

auth.post("/api/auth/register/options", async (c) => {
  const session = await getSession(c);
  const credentialCount = await countCredentials(c.env.DB);

  if (credentialCount > 0) {
    if (!session) return c.json({ error: "unauthorized" }, 401);
  } else {
    const provided = c.req.header("x-bootstrap-secret") ?? "";
    if (
      !c.env.BOOTSTRAP_SECRET ||
      !constantTimeEqual(provided, c.env.BOOTSTRAP_SECRET)
    ) {
      return c.json({ error: "bootstrap_required" }, 401);
    }
  }

  const { options, challengeId } = await startRegistration(c.env);
  return c.json({ options, challengeId });
});

auth.post("/api/auth/register/verify", async (c) => {
  const body = (await c.req.json()) as {
    challengeId: string;
    label?: string;
    response: Parameters<typeof finishRegistration>[2];
  };

  const session = await getSession(c);
  const credentialCount = await countCredentials(c.env.DB);
  if (credentialCount > 0 && !session) {
    return c.json({ error: "unauthorized" }, 401);
  }
  if (credentialCount === 0) {
    const provided = c.req.header("x-bootstrap-secret") ?? "";
    if (
      !c.env.BOOTSTRAP_SECRET ||
      !constantTimeEqual(provided, c.env.BOOTSTRAP_SECRET)
    ) {
      return c.json({ error: "bootstrap_required" }, 401);
    }
  }

  const result = await finishRegistration(
    c.env,
    body.challengeId,
    body.response,
    body.label ?? null,
  );
  if (!result.ok) return c.json({ error: result.error }, 400);

  if (credentialCount === 0) {
    await createSession(c, USER_HANDLE);
  }
  return c.json({ ok: true });
});

auth.get("/api/credentials", async (c) => {
  const session = await getSession(c);
  if (!session) return c.json({ error: "unauthorized" }, 401);
  const creds = await listCredentials(c.env.DB);
  return c.json({
    credentials: creds.map((c) => ({
      credential_id: c.credential_id,
      label: c.label,
      device_type: c.device_type,
      backed_up: c.backed_up,
      transports: c.transports,
      created_at: c.created_at,
      last_used_at: c.last_used_at,
    })),
  });
});

auth.delete("/api/credentials/:id", async (c) => {
  const session = await getSession(c);
  if (!session) return c.json({ error: "unauthorized" }, 401);
  const id = c.req.param("id");
  if ((await countCredentials(c.env.DB)) <= 1) {
    return c.json({ error: "cannot_delete_last_credential" }, 400);
  }
  await deleteCredential(c.env.DB, id);
  return c.json({ ok: true });
});
