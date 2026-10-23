import { expect, it } from "vitest";
import { contextForPrompt } from "../src/context";
it("bounds prompt context while preferring core facts and retaining retrieval references", () => {
  const records = Array.from({ length: 50 }, (_, i) => ({
    id: "context-" + i,
    title: "Context " + i,
    body: "x".repeat(2000),
    core: i === 49,
  }));
  const result = contextForPrompt(records, 8000);
  expect(JSON.stringify(result).length).toBeLessThan(8000);
  expect(result.records[0]).toEqual(records[49]);
  expect(result.truncated).toBe(true);
  expect(result.omitted.length).toBeGreaterThan(0);
  expect(records).toHaveLength(50);
});
