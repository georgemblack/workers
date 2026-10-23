import { runInNewContext } from "node:vm";
import { expect, it, vi } from "vitest";
import { renderMarkdown } from "../src/markdown";
import { page } from "../src/ui";

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

function openChat() {
  const elements = new Map<string, any>();
  const element = (id: string) => {
    if (!elements.has(id))
      elements.set(id, {
        value: "",
        innerHTML: "",
        open: false,
        requestSubmit: vi.fn(),
      });
    return elements.get(id);
  };
  const reply = "**Saved**\n\n- Buy diapers";
  runInNewContext(page.match(/<script>([\s\S]*?)<\/script>/)![1], {
    document: {
      getElementById: element,
      addEventListener: vi.fn(),
      hidden: false,
    },
    location: { pathname: "/chat" },
    localStorage: { getItem: () => null },
    setInterval: vi.fn(),
    fetch: async () => ({
      ok: true,
      json: async () => ({
        items: [],
        changes: [],
        messages: [
          {
            source: "chat",
            created_at: new Date().toISOString(),
            text: "<b>my message</b>",
            html: renderMarkdown(reply),
            result: { status: "answered", text: reply },
          },
        ],
      }),
    }),
  });
  return element;
}

it("inserts formatted replies in chat while keeping user messages as escaped text", async () => {
  const element = openChat();
  await vi.waitFor(() =>
    expect(element("messages").innerHTML).toContain("<strong>Saved</strong>"),
  );
  expect(element("messages").innerHTML).toContain("<li>Buy diapers</li>");
  expect(element("messages").innerHTML).toContain(
    "&lt;b&gt;my message&lt;/b&gt;",
  );
  expect(element("messages").innerHTML).not.toContain("<b>my message</b>");
});

it("submits with Enter, allowing Shift+Enter and IME composition without accidental sends", () => {
  const element = openChat();
  element("chat-text").value = "Buy diapers";
  const press = (options: Record<string, unknown> = {}) => {
    const event = { key: "Enter", preventDefault: vi.fn(), ...options };
    element("chat-text").onkeydown(event);
    return event;
  };
  expect(press().preventDefault).toHaveBeenCalledOnce();
  expect(element("compose").requestSubmit).toHaveBeenCalledOnce();
  expect(press({ shiftKey: true }).preventDefault).not.toHaveBeenCalled();
  expect(press({ isComposing: true }).preventDefault).not.toHaveBeenCalled();
  expect(press({ keyCode: 229 }).preventDefault).not.toHaveBeenCalled();
  press({ repeat: true });
  element("chat-text").value = "   ";
  press();
  expect(element("compose").requestSubmit).toHaveBeenCalledOnce();
});
