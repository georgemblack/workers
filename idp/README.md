# IdP

Single-user OpenID Connect identity provider, deployed to Cloudflare Workers
at `https://idp.george.black`.

- **Auth**: passkey (WebAuthn) only
- **Flows**: Authorization Code + PKCE, refresh tokens
- **Endpoints**: discovery, JWKS, `/authorize`, `/token`, `/userinfo`, `/logout`
- **Storage**: D1 for everything — clients, passkey credentials, auth codes,
  refresh tokens, and WebAuthn challenges
- **Signing**: ES256 (P-256), key stored as a wrangler secret

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
echo "$(openssl rand -hex 32)" | pnpx wrangler secret put BOOTSTRAP_SECRET

# 6. Set the cookie-signing secret
echo "$(openssl rand -hex 32)" | pnpx wrangler secret put SESSION_SECRET

# 7. Set the email address returned in the `email` claim
echo "you@example.com" | pnpx wrangler secret put USER_EMAIL

# 8. Deploy
pnpm run deploy
```

After deploy, visit `https://idp.george.black/register`, paste the bootstrap
secret, and enroll your first passkey. Once a credential exists, the bootstrap
path is locked and further passkeys can only be added from `/admin` while
signed in.

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
