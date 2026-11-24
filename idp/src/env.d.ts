declare namespace Cloudflare {
  interface Env {
    SIGNING_JWK: string;
    // Only set while enrolling the first passkey. See "Getting back in if every passkey is lost" in the README.
    BOOTSTRAP_SECRET?: string;
    SESSION_SECRET: string;
    USER_EMAIL: string;
    // Brrr webhook URL for sign-in push notifications. Notifications are skipped if unset.
    BRRR_URL?: string;
  }
}
