import MarkdownIt from "markdown-it";

// Model output is untrusted: escape embedded HTML and keep the parser's
// built-in rejection of unsafe link protocols.
const markdown = new MarkdownIt({ html: false, breaks: true, linkify: true });

export function renderMarkdown(text: string) {
  return markdown.render(text);
}
