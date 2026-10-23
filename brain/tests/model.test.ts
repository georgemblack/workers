import { expect, it, vi } from "vitest";
import { createBrainAI } from "../src/model";

it("uses Responses, low reasoning and the named gateway with BYOK required", async () => {
  const run = vi.fn(
    async () =>
      new Response(
        "event: response.completed\ndata: " +
          JSON.stringify({
            type: "response.completed",
            response: {
              id: "resp_test",
              model: "gpt-6-luna",
              status: "completed",
              output: [
                {
                  type: "message",
                  id: "msg_test",
                  role: "assistant",
                  content: [
                    { type: "output_text", text: "OK", annotations: [] },
                  ],
                },
              ],
              usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
            },
          }) +
          "\n\n",
        { headers: { "Content-Type": "text/event-stream" } },
      ),
  );
  const ai = createBrainAI({ run } as unknown as Ai, "brain");
  const model = ai("openai/gpt-6-luna");
  expect(model.api).toBe("openai-responses");
  const result = await ai.completeSimple(
    model,
    { messages: [{ role: "user", content: "Reply OK", timestamp: 0 }] },
    { reasoning: "low", maxTokens: 128 },
  );
  expect(result.stopReason).not.toBe("error");
  const [id, input, options] = run.mock.calls[0] as unknown as [
    string,
    Record<string, unknown>,
    Record<string, unknown>,
  ];
  expect(id).toBe("openai/gpt-6-luna");
  expect(input).toMatchObject({ reasoning: { effort: "low" }, store: false });
  expect(options).toMatchObject({
    gateway: { id: "brain", skipCache: true },
    openaiEndpoint: "/v1/responses",
    extraHeaders: { "cf-aig-no-wholesale": "true" },
  });
});
