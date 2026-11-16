import { tracing } from "cloudflare:workers";

const ERROR_CHANCE = 0.2;
const PUBLIC_URL = "https://tbdev.georgeblack.workers.dev/";

const ERROR_MESSAGES = [
  "Something went wrong while loading the dashboard",
  "Unexpected null value in user session",
  "Timed out waiting for upstream response",
  "Failed to parse request payload",
];

// Placeholder logs so there are example entries to look at in the dashboard.
const INFO_MESSAGES = [
  "pineapple pizza is good",
  "the quick brown fox jumps over the lazy dog",
  "coffee has been brewed successfully",
  "all systems are looking great today",
  "someone just asked for the dashboard again",
];

const WARN_MESSAGES = [
  "Cache is running slower than usual",
  "Upstream response was close to the timeout",
  "Session token expires soon",
  "Falling back to default profile settings",
  "Rate limit is almost used up",
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
      if (Math.random() < 0.3) console.warn(WARN_MESSAGES[randomInt(0, WARN_MESSAGES.length - 1)]);
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
    if (Math.random() < 0.15) console.warn({ event: "upstream_slow", upstream: "recommendations" });
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
    console.error({ event: "upstream_failed", message });
    throw new Error(message);
  }
}

export default {
  async fetch(): Promise<Response> {
    const user = await authenticate();

    console.info({ event: "request_started", userId: user.id });

    const root = tracing.getActiveSpan();
    root?.setAttribute("user.id", user.id);
    root?.setAttribute("account.id", user.accountId);

    await loadProfile(user.id);
    const activityCount = await fetchRecentActivity();
    const upstream = await callUpstream();
    const body = await renderDashboard(upstream.items + activityCount);

    // Only reached when nothing above threw, i.e. we're about to return a happy response.
    console.info(INFO_MESSAGES[randomInt(0, INFO_MESSAGES.length - 1)]);
    console.log({
      event: "dashboard_rendered",
      userId: user.id,
      accountId: user.accountId,
      items: upstream.items + activityCount,
      cacheHit: Math.random() < 0.6,
    });
    console.log({
      event: "request_summary",
      activityQueries: activityCount,
      upstreamItems: upstream.items,
      tags: ["dashboard", "ok"],
    });

    // Occasionally log a handled problem, where the request still succeeds.
    if (Math.random() < 0.1) {
      console.error(new Error("Failed to write audit log entry, continuing anyway"));
    }

    return new Response(body);
  },

  // Runs every other minute and sends a few requests to our own public URL to generate traffic.
  async scheduled(): Promise<void> {
    const count = randomInt(1, 5);
    for (let i = 0; i < count; i++) {
      // Pause a random amount between requests so they don't arrive in a burst.
      if (i > 0) await simulateWork(500, 5000);

      const response = await fetch(PUBLIC_URL);
      // Errors are expected here, so just read the body and move on.
      await response.arrayBuffer();
    }
  },
} satisfies ExportedHandler;
