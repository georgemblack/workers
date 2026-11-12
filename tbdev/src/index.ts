import { tracing } from "cloudflare:workers";

const ERROR_CHANCE = 0.2;

const ERROR_MESSAGES = [
  "Something went wrong while loading the dashboard",
  "Unexpected null value in user session",
  "Timed out waiting for upstream response",
  "Failed to parse request payload",
];

const randomInt = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

// Temporary: pretend work is happening so spans have a visible duration.
const simulateWork = (minMs: number, maxMs: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, randomInt(minMs, maxMs)));

// Runs a step inside its own span. If the step fails, the error is recorded on the span before rethrowing.
function step<T>(name: string, fn: (span: Span) => Promise<T> | T): Promise<T> {
  return tracing.enterSpan(name, async (span) => {
    try {
      return await fn(span);
    } catch (err) {
      span.recordException(err as Error);
      span.setStatus({ code: "error", message: (err as Error).message });
      throw err;
    }
  });
}

async function authenticate() {
  return step("authenticate", async (span) => {
    await simulateWork(5, 40);
    const user = {
      id: `user_${randomInt(0, 999)}`,
      accountId: `acct_${randomInt(0, 99)}`,
    };
    span.setAttribute("auth.method", Math.random() < 0.5 ? "session" : "token");
    return user;
  });
}

async function loadProfile(userId: string) {
  return step("loadProfile", async (span) => {
    span.setAttribute("user.id", userId);
    const cacheHit = Math.random() < 0.6;
    span.setAttribute("cache.hit", cacheHit);

    await step("profileCache", () => simulateWork(2, 10));
    if (!cacheHit) {
      await step("profileDatabase", async (dbSpan) => {
        dbSpan.setAttribute("db.rows", randomInt(1, 5));
        await simulateWork(20, 120);
      });
    }
    return { name: `Person ${randomInt(1, 500)}` };
  });
}

async function fetchRecentActivity() {
  return step("fetchRecentActivity", async (span) => {
    const count = randomInt(1, 4);
    span.setAttribute("query.count", count);

    // Run the queries in parallel so the spans overlap in the trace.
    await Promise.all(
      Array.from({ length: count }, (_, i) =>
        step(`activityQuery.${i}`, async (querySpan) => {
          querySpan.setAttribute("query.index", i);
          await simulateWork(15, 90);
        }),
      ),
    );
    return count;
  });
}

async function callUpstream() {
  return step("callUpstream", async (span) => {
    span.setAttribute("upstream.name", "recommendations");
    await simulateWork(30, 200);
    maybeFail();
    return { items: randomInt(0, 20) };
  });
}

function renderDashboard(itemCount: number) {
  return step("renderDashboard", (span) => {
    span.setAttribute("render.items", itemCount);
    // Burn a little CPU so this span reflects compute rather than waiting.
    // This counts iterations because Workers don't advance the clock during computation.
    const iterations = randomInt(20_000, 200_000);
    for (let i = 0; i < iterations; i++) {
      Math.sqrt(Math.random());
    }
    return "ok";
  });
}

function maybeFail() {
  if (Math.random() < ERROR_CHANCE) {
    const message = ERROR_MESSAGES[randomInt(0, ERROR_MESSAGES.length - 1)];
    throw new Error(message);
  }
}

export default {
  async fetch(): Promise<Response> {
    const user = await authenticate();

    const root = tracing.getActiveSpan();
    root?.setAttribute("user.id", user.id);
    root?.setAttribute("account.id", user.accountId);

    await loadProfile(user.id);
    const activityCount = await fetchRecentActivity();
    const upstream = await callUpstream();
    const body = await renderDashboard(upstream.items + activityCount);

    return new Response(body);
  },
} satisfies ExportedHandler;
