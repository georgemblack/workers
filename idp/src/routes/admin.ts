import { Hono } from "hono";
import {
  createClient,
  deleteClient,
  hashSecret,
  listClients,
} from "../storage";
import { getSession } from "../session";
import { randomToken } from "../util";

export const admin = new Hono<{ Bindings: Cloudflare.Env }>();

admin.use("/api/admin/*", async (c, next) => {
  const session = await getSession(c);
  if (!session) return c.json({ error: "unauthorized" }, 401);
  await next();
});

admin.get("/api/admin/clients", async (c) => {
  const clients = await listClients(c.env.DB);
  return c.json({
    clients: clients.map((cl) => ({
      client_id: cl.client_id,
      name: cl.name,
      redirect_uris: cl.redirect_uris,
      post_logout_redirect_uris: cl.post_logout_redirect_uris,
      token_endpoint_auth_method: cl.token_endpoint_auth_method,
      created_at: cl.created_at,
      has_secret: !!cl.client_secret_hash,
    })),
  });
});

admin.post("/api/admin/clients", async (c) => {
  const body = (await c.req.json()) as {
    name: string;
    redirect_uris: string[];
    post_logout_redirect_uris?: string[];
    token_endpoint_auth_method?:
      | "client_secret_basic"
      | "client_secret_post"
      | "none";
  };

  if (
    !body.name ||
    !Array.isArray(body.redirect_uris) ||
    body.redirect_uris.length === 0
  ) {
    return c.json({ error: "name and redirect_uris required" }, 400);
  }
  for (const uri of body.redirect_uris) {
    try {
      new URL(uri);
    } catch {
      return c.json({ error: `invalid redirect_uri: ${uri}` }, 400);
    }
  }
  for (const uri of body.post_logout_redirect_uris ?? []) {
    try {
      new URL(uri);
    } catch {
      return c.json({ error: `invalid post_logout_redirect_uri: ${uri}` }, 400);
    }
  }

  const method = body.token_endpoint_auth_method ?? "client_secret_basic";
  const client_id = randomToken(16);
  let client_secret: string | null = null;
  let client_secret_hash: string | null = null;
  if (method !== "none") {
    client_secret = randomToken(32);
    client_secret_hash = await hashSecret(client_secret);
  }

  await createClient(c.env.DB, {
    client_id,
    client_secret_hash,
    name: body.name,
    redirect_uris: body.redirect_uris,
    post_logout_redirect_uris: body.post_logout_redirect_uris ?? [],
    token_endpoint_auth_method: method,
  });

  return c.json({
    client_id,
    client_secret,
    name: body.name,
    redirect_uris: body.redirect_uris,
    post_logout_redirect_uris: body.post_logout_redirect_uris ?? [],
    token_endpoint_auth_method: method,
    note: client_secret
      ? "Save the client_secret now — it will not be shown again."
      : undefined,
  });
});

admin.delete("/api/admin/clients/:id", async (c) => {
  const id = c.req.param("id");
  await deleteClient(c.env.DB, id);
  return c.json({ ok: true });
});
