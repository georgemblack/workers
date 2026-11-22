# IdP

Single-user OpenID Connect identity provider, deployed to Cloudflare Workers
at `https://idp.george.black`.

## One-time setup

```sh
# 1. Create the D1 database (paste the returned id into wrangler.jsonc)
pnpx wrangler d1 create idp

# 2. Generate types now that bindings are in place
pnpm run typegen

# 3. Apply migrations
pnpm run db:migrate          # remote
pnpm run db:migrate:local    # local dev

# 4. Generate the signing key and store it as a secret
pnpm -s run keygen | pnpx wrangler secret put SIGNING_JWK

# 5. Set the bootstrap secret used to enroll the first passkey
#    (also add it to `env` in cloudflare.config.ts; see "Bootstrap secret" below)
echo "$(openssl rand -hex 32)" | pnpx wrangler secret put BOOTSTRAP_SECRET

# 6. Set the cookie-signing secret
echo "$(openssl rand -hex 32)" | pnpx wrangler secret put SESSION_SECRET

# 7. Set the email address returned in the `email` claim
echo "you@example.com" | pnpx wrangler secret put USER_EMAIL

# 8. Deploy
pnpm run deploy

# 9. Open passkey registration for 15 minutes
pnpm run registration:open
```

Then visit `https://idp.george.black/register`, paste the bootstrap secret,
and enroll your first passkey. Once a credential exists, the bootstrap path is
locked and further passkeys can only be added from `/admin` while signed in.

## Registering a new passkey

Passkey registration is closed by default. The register endpoints
(`/api/auth/register/*`) return `403 registration_closed` unless it has been
opened by hand. When it's open, you still need to be signed in (or, before any
passkey exists, have the bootstrap secret). Opening registration adds an extra
lock; it doesn't replace the others.

To add a passkey:

1. Open registration for 15 minutes:

   ```sh
   pnpm run registration:open
   ```

   It prints the time (UTC) when registration closes again.

2. Sign in at `https://idp.george.black/admin` and click "Add passkey".
3. Close registration right away instead of waiting for it to expire:

   ```sh
   pnpm run registration:close
   ```

Both commands change the `registration_open_until` row in the D1 `settings`
table (a Unix timestamp; `0` means closed). They take effect immediately, with
no redeploy needed.

### Bootstrap secret

`BOOTSTRAP_SECRET` is only used to enroll the very first passkey, so it's
normally **not set** on the deployed worker. Without it, the bootstrap path
can't be used at all.

`cf deploy` fails if a secret listed in `cloudflare.config.ts` doesn't exist,
so the secret is also left out of that file. If you ever need to bootstrap
again (for example, after wiping the passkey table):

1. Add `BOOTSTRAP_SECRET: bindings.secret(),` back to `env` in
   `cloudflare.config.ts`.
2. Set the secret and deploy (steps 5 and 8 above), then open registration and
   enroll at `/register`.
3. Remove the line from `cloudflare.config.ts`, delete the secret, and deploy
   again:

   ```sh
   pnpx wrangler secret delete BOOTSTRAP_SECRET
   ```

## OIDC endpoints

| Purpose              | Path                                |
| -------------------- | ----------------------------------- |
| Discovery            | `/.well-known/openid-configuration` |
| JWKS                 | `/.well-known/jwks.json`            |
| Authorization        | `/authorize`                        |
| Token                | `/token`                            |
| UserInfo             | `/userinfo`                         |
| End session (logout) | `/logout`                           |

Supported scopes: `openid`, `profile`, `email`, `offline_access`.

PKCE (`S256`) is **required** for `/authorize` requests.

## Registering a relying party

1. Sign in at `https://idp.george.black/admin`.
2. Click "New client", fill in name, redirect URIs, and pick an auth method.
3. Copy the `client_id` (and `client_secret` for confidential clients) — the
   secret is shown only once.

## Local development

```sh
pnpm install
pnpm run db:migrate:local
pnpx wrangler secret put SIGNING_JWK --local       # paste output of `pnpm -s run keygen`
pnpx wrangler secret put BOOTSTRAP_SECRET --local
pnpx wrangler secret put SESSION_SECRET --local
pnpx wrangler secret put USER_EMAIL --local
pnpm run dev
```

The `registration:*` scripts only work against the remote database. To open
registration locally, edit the local D1 file directly:

```sh
sqlite3 .cloudflare/state/v3/d1/miniflare-D1DatabaseObject/<hash>.sqlite \
  "UPDATE settings SET value = unixepoch() + 900 WHERE key = 'registration_open_until'"
```

Note: WebAuthn requires a secure context. For local dev, use `http://localhost`
(treated as secure by browsers) and set `RP_ID=localhost` / `ISSUER=http://localhost:8787`
via a wrangler `--env` or by editing `wrangler.jsonc` temporarily.

## Architecture notes

- `src/routes/oidc.ts` — discovery, JWKS, authorize, token, userinfo, logout
- `src/routes/auth.ts` — passkey login / register / credential management
- `src/routes/admin.ts` — OIDC client CRUD
- `src/webauthn.ts` — wraps `@simplewebauthn/server`
- `src/keys.ts` — JWT signing via `jose`
- `src/session.ts` — HMAC-signed cookie sessions (`idp_session`, 12h)
- `src/storage.ts` — D1 + KV access
- `public/` — static front-end (login / register / admin)
