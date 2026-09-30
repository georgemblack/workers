import { bindings, defineConfig } from "cf/config";

/**
 * Secrets (set via `cf workers secrets update`):
 *  - SIGNING_JWK         JSON of the ES256 private key (JWK)
 *  - BOOTSTRAP_SECRET    One-time secret allowing initial passkey enrollment
 *  - SESSION_SECRET      HMAC key for signing session cookies
 *  - USER_EMAIL          Email address returned in the `email` claim
 */
export default defineConfig({
  accountId: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
  worker: {
    name: "idp",
    compatibilityDate: "2026-05-03",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint: "src/index.ts",
    workersDev: false,
    previewUrls: false,
    observability: {
      enabled: true,
    },
    assets: {
      htmlHandling: "auto-trailing-slash",
      notFoundHandling: "none",
    },
    domains: ["idp.george.black"],
    env: {
      DB: bindings.d1({
        name: "idp",
        id: "8bd2f6a9-bf22-4d19-aba5-a387aa9d3407",
      }),
      ASSETS: bindings.assets(),
    },
  },
});
