import { tracing } from "cloudflare:workers";

const ERROR_CHANCE = 0.2;

const ERROR_MESSAGES = [
  "Something went wrong while loading the dashboard",
  "Unexpected null value in user session",
  "Timed out waiting for upstream response",
  "Failed to parse request payload",
];

const USER_TIERS = ["free", "pro", "enterprise"];

export default {
  async fetch(): Promise<Response> {
    return tracing.enterSpan("tbdev.request", (span) => {
      const userTier = USER_TIERS[Math.floor(Math.random() * USER_TIERS.length)];
      span.setAttribute("user.tier", userTier);

      if (Math.random() < ERROR_CHANCE) {
        const message = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
        throw new Error(message);
      }

      return new Response("ok");
    });
  },
} satisfies ExportedHandler;
