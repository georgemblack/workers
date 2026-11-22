# IdP

My personal identity provider: I sign in here once with a passkey, and my other apps trust it to know it's me.

It lives at [idp.george.black](https://idp.george.black). Everything below is how to look after it.

## Deploying a change

```sh
pnpm run check
pnpm run deploy
```

## Changing the database

1. Add a new file to `migrations/`, numbered after the last one (e.g. `0005_something.sql`).
2. Apply it to the live database:

   ```sh
   pnpm run db:migrate
   ```

3. Then deploy the code that uses it.

## Adding a passkey

Registration is closed by default, even while signed in. To add a passkey (a new device, for example):

1. Open registration. It closes by itself after 15 minutes.

   ```sh
   pnpm run registration:open
   ```

2. Sign in at [/admin](https://idp.george.black/admin) and click **Add passkey**.
3. Close it again when you're done:

   ```sh
   pnpm run registration:close
   ```

## Connecting a new app

1. Sign in at [/admin](https://idp.george.black/admin) and click **New client**.
2. Give it a name and the app's redirect URL(s).
3. Copy the client ID and secret into the app. The secret is only shown once; if you lose it, delete the client and make a new one.

## Secrets

These are set on the worker, not stored in the repo. Changing one takes effect right away, with no deploy needed.

| Secret           | What it is                        | Changing it means…                                                           |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| `SIGNING_JWK`    | The key that signs sign-in tokens | Tokens already handed out stop working, so apps may ask you to sign in again |
| `SESSION_SECRET` | Signs your browser session        | You're signed out of the idp                                                 |
| `USER_EMAIL`     | The email address apps receive    | Apps see the new email next sign-in                                          |

To set or change one:

```sh
# Signing key
cf workers secrets update SIGNING_JWK --worker idp --type secret_text --text "$(pnpm -s run keygen)"

# Session secret
cf workers secrets update SESSION_SECRET --worker idp --type secret_text --text "$(openssl rand -hex 32)"

# Email
cf workers secrets update USER_EMAIL --worker idp --type secret_text --text "you@example.com"
```

## Getting back in if every passkey is lost

Normally there's no way to register a passkey without already being signed in. To get back in, temporarily turn on the bootstrap secret:

1. Add `BOOTSTRAP_SECRET: bindings.secret(),` to `env` in `cloudflare.config.ts`.
2. Set it and deploy:

   ```sh
   cf workers secrets update BOOTSTRAP_SECRET --worker idp --type secret_text --text "$(openssl rand -hex 32)"
   pnpm run deploy
   ```

3. Open registration (`pnpm run registration:open`), go to [/register](https://idp.george.black/register), paste the secret, and add your passkey. This only works while no passkeys exist, so delete old ones from the `credentials` table first if needed.
4. Turn it back off: remove the line from `cloudflare.config.ts`, then delete the secret and deploy.

   ```sh
   cf workers secrets delete BOOTSTRAP_SECRET --worker idp
   pnpm run deploy
   ```

## Setting it up from scratch

Only needed if the idp is ever rebuilt somewhere new.

1. Create a D1 database, and put its ID in `cloudflare.config.ts` and the `db:*` / `registration:*` scripts in `package.json`.
2. Apply the migrations: `pnpm run db:migrate`
3. Set `SIGNING_JWK`, `SESSION_SECRET` and `USER_EMAIL` (see [Secrets](#secrets)).
4. Deploy: `pnpm run deploy`
5. Add your first passkey with the bootstrap secret (see [Getting back in](#getting-back-in-if-every-passkey-is-lost)).
