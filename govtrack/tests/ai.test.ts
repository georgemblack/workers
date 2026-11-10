import { expect, it } from "vitest";
import { rawResponse, compatibleAI } from "../src/ai";
it("preserves native Responses and normalizes decoded completions", async () => {
  const response = Response.json({ choices: [] });
  expect(rawResponse(response)).toBe(response);
  expect(
    await rawResponse({ choices: [{ message: { content: "Done" } }] }).json(),
  ).toEqual({ choices: [{ message: { content: "Done" } }] });
});
it("wraps streamed binding results with the SSE content type", async () => {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  const response = rawResponse(stream);
  expect(response.headers.get("Content-Type")).toBe("text/event-stream");
  expect(await response.text()).toBe("data: [DONE]\n\n");
});
it("only adapts raw requests and retains the original binding receiver", async () => {
  const binding = {
    marker: true,
    run(this: { marker: boolean }) {
      expect(this.marker).toBe(true);
      return { choices: [] };
    },
  } as unknown as Ai;
  const ai = compatibleAI(binding);
  const run = ai.run as (...args: unknown[]) => Promise<unknown>;
  expect(await run("model", {})).toEqual({ choices: [] });
  expect(await run("model", {}, { returnRawResponse: true })).toBeInstanceOf(
    Response,
  );
});
it("preserves cross-runtime response bodies and error status", async () => {
  const native = new Response("upstream denied", {
    status: 401,
    headers: { "content-type": "text/plain" },
  });
  const foreign = {
    body: native.body,
    headers: native.headers,
    status: native.status,
    statusText: native.statusText,
  };
  const normalized = rawResponse(foreign);
  expect(normalized.status).toBe(401);
  expect(await normalized.text()).toBe("upstream denied");
});
it("adds required gateway headers while preserving existing options", async () => {
  const binding = {
    async run(_model: unknown, _input: unknown, options: unknown) {
      return options;
    },
  } as unknown as Ai;
  const ai = compatibleAI(binding, { "cf-aig-no-wholesale": "true" });
  const result = await (ai.run as (...args: unknown[]) => Promise<unknown>)(
    "model",
    {},
    { gateway: { id: "brain" }, extraHeaders: { "x-test": "yes" } },
  );
  expect(result).toEqual({
    gateway: { id: "brain" },
    extraHeaders: { "x-test": "yes", "cf-aig-no-wholesale": "true" },
  });
});
