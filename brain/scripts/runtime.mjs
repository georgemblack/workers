// An isolated workerd + SQLite + Pi runtime; never connects to the production DO.
import { build } from "esbuild";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";

export async function createRuntime(respond) {
  const bundle = await build({
    stdin: {
      contents: `import worker, {Brain as ProductionBrain} from "./src/index.ts";
      export class Brain extends ProductionBrain {
        constructor(ctx,env){super(ctx,{...env,AI:{run(model,input,options){const {signal,...rest}=options??{};return env.AI.run(model,input,rest)}}})}
      }
      export default worker;`,
      loader: "ts",
      resolveDir: process.cwd(),
    },
    bundle: true,
    write: false,
    format: "esm",
    platform: "neutral",
    mainFields: ["module", "main"],
    conditions: ["workerd", "worker", "browser"],
    external: ["cloudflare:*", "node:*"],
    target: "es2023",
  });
  const options = convertV4MiniflareOptions({
    workers: [
      {
        name: "brain-test",
        modules: true,
        script: bundle.outputFiles[0].text,
        compatibilityDate: "2026-10-23",
        compatibilityFlags: ["nodejs_compat"],
        bindings: {
          LOCAL_DEV: "true",
          ACCESS_AUD: "test",
          MODEL: "openai/gpt-6-luna",
          AI_GATEWAY: "brain",
          TIMEZONE: "America/Chicago",
        },
        durableObjects: { BRAIN: { className: "Brain", useSQLite: true } },
        serviceBindings: { AI: "ai-bridge" },
      },
      {
        name: "ai-bridge",
        modules: true,
        compatibilityDate: "2026-10-23",
        script: `import { WorkerEntrypoint } from "cloudflare:workers";
      export default class extends WorkerEntrypoint {
        async run(model,input,options) {
          const response=await this.env.MODEL.fetch(new Request("http://model/",{method:"POST",body:JSON.stringify({model,input,options})}));
          if(options?.returnRawResponse)return response;
          if(!response.ok)throw new Error("Model fixture failed: "+response.status);
          return response.json();
        }
      }`,
        serviceBindings: {
          MODEL: async (request) => respond(await request.json()),
        },
      },
    ],
  });
  const runtime = new Miniflare({
    ...options,
    unsafeInspectDurableObjects: true,
  });
  const request = (path, init) =>
    runtime.dispatchFetch("http://localhost" + path, init);
  const json = async (path) => {
    const response = await request(path);
    if (!response.ok) throw new Error("Read failed: " + response.status);
    return response.json();
  };
  async function send(id, text) {
    const response = await request("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text, source: "api" }),
    });
    if (response.status !== 202)
      throw new Error(
        "Capture rejected: " + response.status + " " + (await response.text()),
      );
    return response.json();
  }
  async function wait(id, timeout = 120000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const state = await json("/api/chat");
      const message = state.messages.find((m) => m.id === id);
      if (
        message &&
        ["done", "unanswered", "parked"].includes(message.result.status)
      ) {
        if (message.result.status !== "done")
          throw new Error(
            "Operation failed: " + JSON.stringify(message.result),
          );
        return message;
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    throw new Error("Timed out waiting for " + id);
  }
  return {
    runtime,
    request,
    json,
    send,
    wait,
    dispose: () => runtime.dispose(),
  };
}
export function completion(output) {
  const events = output.map((item, output_index) => ({
    type: "response.output_item.done",
    output_index,
    item,
  }));
  events.push({
    type: "response.completed",
    response: {
      id: "resp_fixture",
      model: "gpt-6-luna",
      status: "completed",
      output,
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  });
  return new Response(
    events
      .map(
        (event) =>
          "event: " + event.type + "\ndata: " + JSON.stringify(event) + "\n\n",
      )
      .join(""),
    { headers: { "Content-Type": "text/event-stream" } },
  );
}
export const reply = (text) =>
  completion([
    {
      type: "message",
      id: "msg_fixture",
      role: "assistant",
      content: [{ type: "output_text", text, annotations: [] }],
    },
  ]);
