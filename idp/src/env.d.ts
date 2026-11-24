declare namespace Cloudflare {
  interface Env {
    SIGNING_JWK: string;
    // Only set while enrolling the first passkey. See "Getting back in if every passkey is lost" in the README.
    BOOTSTRAP_SECRET?: string;
    SESSION_SECRET: string;
    USER_EMAIL: string;
  }
}
