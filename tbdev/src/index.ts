const ERROR_CHANCE = 0.2;

const ERROR_MESSAGES = [
  "Something went wrong while loading the dashboard",
  "Unexpected null value in user session",
  "Timed out waiting for upstream response",
  "Failed to parse request payload",
];

export default {
  async fetch(): Promise<Response> {
    if (Math.random() < ERROR_CHANCE) {
      const message = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
      throw new Error(message);
    }

    return new Response("ok");
  },
} satisfies ExportedHandler<Env>;
