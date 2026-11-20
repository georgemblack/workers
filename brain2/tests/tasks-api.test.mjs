import { beforeAll, afterAll, expect, it } from "vitest";
import { createRuntime, completion, reply } from "../scripts/runtime.mjs";

// Scripted model that makes one tool call per round, using IDs from the
// previous round's results, then replies.
const call = (call_id, name, args) =>
  completion([
    {
      type: "function_call",
      id: "fc_" + call_id,
      call_id,
      name,
      arguments: JSON.stringify(args),
    },
  ]);
function respond({ input }) {
  const items = input.input;
  const start = items.findLastIndex((item) => item.role === "user");
  const results = items
    .slice(start + 1)
    .filter((item) => item.type === "function_call_output")
    .map((item) => {
      const text = Array.isArray(item.output)
        ? item.output.map((part) => part.text).join("")
        : item.output;
      return JSON.parse(text);
    });
  if (results.some((r) => r.error))
    return reply("Error: " + results.at(-1).error);
  switch (results.length) {
    case 0:
      return call("c-area", "create_area", { title: "Home" });
    case 1:
      return call("c-garden", "create_task", {
        title: "Plan garden beds",
        links: { in_area: [results[0].id] },
      });
    case 2:
      return call("c-seeds", "create_task", {
        title: "Buy seeds",
        due_label: "Before spring",
        due_date: "2027-03-01",
        links: { parent: [results[1].id] },
      });
    default:
      return reply("Added.");
  }
}

let app;
beforeAll(async () => {
  app = await createRuntime(respond);
}, 30000);
afterAll(async () => {
  await app?.dispose();
});

it("shows a task with a sub-task under its area on the dashboard", async () => {
  await app.send("tasks-1", "I need to plan the garden beds and buy seeds");
  const message = await app.wait("tasks-1");
  expect(message.result.text).toBe("Added.");
  const state = await app.json("/api/state");
  expect(state.views.tasks.areas).toEqual([
    {
      id: expect.stringMatching(/^area_/),
      title: "Home",
      items: [
        {
          id: expect.stringMatching(/^task_/),
          title: "Plan garden beds",
          subtitle: "",
          children: [
            {
              id: expect.stringMatching(/^task_/),
              title: "Buy seeds",
              subtitle: "Before spring",
              children: [],
            },
          ],
        },
      ],
    },
  ]);
  expect(state.views.tasks.priorities).toEqual([]);
}, 60000);
