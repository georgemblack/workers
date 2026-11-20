import { expect, it } from "vitest";
import { renderMarkdown } from "../src/markdown";

it("renders the Markdown used in replies, including lists, code, and tables", () => {
  const html = renderMarkdown(
    "## Next up\n\n- **Buy diapers**\n- *Pack bags*\n\n[Hospital](https://example.com)\n\n```js\nconst ready = true;\n```\n\n| Task | Priority |\n| --- | --- |\n| Bags | High |",
  );
  expect(html).toContain("<h2>Next up</h2>");
  expect(html).toContain("<li><strong>Buy diapers</strong></li>");
  expect(html).toContain("<em>Pack bags</em>");
  expect(html).toContain('<a href="https://example.com">Hospital</a>');
  expect(html).toContain('<pre><code class="language-js">');
  expect(html).toContain("<table>");
});

it("escapes raw HTML and rejects executable Markdown links", () => {
  const html = renderMarkdown(
    "<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[click](javascript:alert(1))\n\n[other](vbscript:bad)",
  );
  expect(html).not.toContain("<script");
  expect(html).not.toContain("<img");
  expect(html).not.toContain('href="javascript:');
  expect(html).not.toContain('href="vbscript:');
  expect(html).toContain("&lt;script&gt;");
});
