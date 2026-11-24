import type { MiddlewareHandler } from "hono";
import { createRemoteJWKSet, jwtVerify } from "jose";

// Cloudflare Access sits in front of the admin pages and APIs (the "IdP Admin"
// Access app). As a second lock, the worker also checks the token Access adds
// to each API request it lets through, so a misconfigured or deleted Access app
// doesn't expose any data. The admin pages themselves are static files served
// without the worker; they hold no data, so they aren't checked here.
//
// `ctx.access` can't be used instead: Cloudflare doesn't pass it to Workers
// that serve static assets, which this one does.

const ACCESS_TEAM_DOMAIN = "https://georgeblack.cloudflareaccess.com";
// The "IdP Admin" Access app's audience (AUD) tag. Not a secret.
const ACCESS_AUD = "d83546ca9716bd403fdff8cf62a7dbeb60ad04a8d7752bd31c456eebb85ff9cb";

// The admin APIs, which the IdP Admin Access app also protects. Any new admin
// API path needs adding here and to the app's destinations in
// Zero Trust > Access > Applications.
const PROTECTED_PATHS = ["/api/admin", "/api/credentials", "/api/auth/register"];

// Access's public signing keys, fetched once and cached by jose.
const accessKeys = createRemoteJWKSet(new URL(`${ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`));

// Access matches paths without regard to case, so this does too. Also covers
// anything under each path, like /api/admin/clients.
function isProtected(path: string): boolean {
  const p = path.toLowerCase().replace(/\/{2,}/g, "/");
  return PROTECTED_PATHS.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
}

export const requireAccess: MiddlewareHandler<{ Bindings: Cloudflare.Env }> = async (c, next) => {
  if (!isProtected(c.req.path)) return next();

  const token = c.req.header("cf-access-jwt-assertion");
  if (!token) return c.text("Forbidden", 403);
  try {
    await jwtVerify(token, accessKeys, {
      issuer: ACCESS_TEAM_DOMAIN,
      audience: ACCESS_AUD,
    });
  } catch {
    return c.text("Forbidden", 403);
  }
  return next();
};
