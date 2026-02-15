import { marked } from "marked";
import {
  ContentBlock,
  MarkdownBlock,
  ImageBlock,
  VideoBlock,
  TextBlock,
  HeadingBlock,
  QuoteBlock,
  CodeBlock,
} from "./types";

function renderMarkdown(block: MarkdownBlock): string {
  return marked.parse(block.text, { async: false });
}

function renderText(block: TextBlock): string {
  return block.text;
}

function renderImage(block: ImageBlock): string {
  const img = `<img src="${block.path}" alt="${block.alt}">`;
  if (block.caption) {
    return `<figure>${img}<figcaption>${block.caption}</figcaption></figure>`;
  }
  return `<figure>${img}</figure>`;
}

function renderVideo(block: VideoBlock): string {
  const video = `<video src="${block.path}" controls></video>`;
  if (block.caption) {
    return `<figure>${video}<figcaption>${block.caption}</figcaption></figure>`;
  }
  return `<figure>${video}</figure>`;
}

function renderHeading(block: HeadingBlock): string {
  return `<h${block.level}>${block.text}</h${block.level}>`;
}

function renderQuote(block: QuoteBlock): string {
  return `<blockquote><p>${block.text}</p></blockquote>`;
}

function renderCode(block: CodeBlock): string {
  return `<pre><code>${block.text}</code></pre>`;
}

function renderLine(): string {
  return "<hr>";
}

function renderBreak(): string {
  return "<!-- break -->";
}

export function renderBlock(block: ContentBlock): string {
  switch (block.type) {
    case "markdown":
      return renderMarkdown(block);
    case "text":
      return renderText(block);
    case "image":
      return renderImage(block);
    case "video":
      return renderVideo(block);
    case "heading":
      return renderHeading(block);
    case "quote":
      return renderQuote(block);
    case "code":
      return renderCode(block);
    case "line":
      return renderLine();
    case "break":
      return renderBreak();
  }
}

export function render(content: ContentBlock[]): string {
  return content.map(renderBlock).join("");
}
