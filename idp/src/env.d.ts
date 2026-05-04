declare namespace Cloudflare {
  interface Env {
    SIGNING_JWK: string;
    BOOTSTRAP_SECRET: string;
    SESSION_SECRET: string;
    USER_EMAIL: string;
  }
}
