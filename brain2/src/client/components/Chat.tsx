import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import type { ChatMessage } from "../../shared/contracts";
import type { Ref } from "../logic";

const time = (iso: string) =>
  new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

function Reply({ message }: { message: ChatMessage }) {
  // reply_html comes from the server's Markdown renderer, which escapes raw HTML.
  if (message.status === "done" && message.reply_html)
    return (
      <div
        class="markdown"
        dangerouslySetInnerHTML={{ __html: message.reply_html }}
      />
    );
  const text =
    message.status === "unanswered"
      ? `Could not finish: ${message.detail || "unknown error"}. Send a follow-up to try again.`
      : message.status === "parked"
        ? "Processing paused."
        : message.status === "done"
          ? "Done."
          : "Working on it…";
  return <div class="markdown">{text}</div>;
}

export function Chat({
  messages,
  chips,
  error,
  draft,
  focusKey,
  onRemoveChip,
  onSend,
  onRetry,
}: {
  messages: ChatMessage[];
  chips: Ref[];
  error: string;
  draft: string;
  focusKey: number;
  onRemoveChip: (id: string) => void;
  onSend: (text: string) => Promise<boolean>;
  onRetry: () => void;
}) {
  const [text, setText] = useState(draft);
  const [sending, setSending] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const loaded = useRef(false);

  // Follow new messages only when the reader is already near the bottom.
  const nearBottom = useRef(true);
  const onScroll = () => {
    const el = list.current!;
    nearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };
  useLayoutEffect(() => {
    const el = list.current;
    if (el && (nearBottom.current || !loaded.current))
      el.scrollTop = el.scrollHeight;
    if (messages.length) loaded.current = true;
  }, [messages]);
  useEffect(() => {
    if (focusKey) input.current?.focus();
  }, [focusKey]);

  const send = async () => {
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    if (await onSend(value)) {
      setText("");
      nearBottom.current = true;
    }
    setSending(false);
  };
  return (
    <div class="chat">
      {error && (
        <div class="error" role="alert">
          {error}
        </div>
      )}
      <div class="messages" ref={list} onScroll={onScroll}>
        {messages.map((m) => (
          <article class="message" key={m.id}>
            <div class="speaker mine">
              You · {m.source} · {time(m.created_at)}
            </div>
            <div class="message-text">{m.text}</div>
            {m.refs.length > 0 && (
              <div class="speaker mine">
                About: {m.refs.map((r) => r.title).join(", ")}
              </div>
            )}
            <div class="reply">
              <div class="speaker">brain</div>
              <Reply message={m} />
            </div>
          </article>
        ))}
        {!messages.length && <p class="empty">Tell me what's on your mind.</p>}
      </div>
      {messages.some((m) => m.status === "parked") && (
        <button class="retry" onClick={onRetry}>
          Retry paused work
        </button>
      )}
      <form
        class="composer"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        {chips.length > 0 && (
          <div class="chips">
            {chips.map((chip) => (
              <span class="chip" key={chip.id}>
                {chip.title}
                <button
                  type="button"
                  aria-label={`Remove ${chip.title}`}
                  onClick={() => onRemoveChip(chip.id)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <textarea
          ref={input}
          aria-label="Message brain"
          placeholder="Message…"
          maxLength={16000}
          value={text}
          onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
          onKeyDown={(e) => {
            // Enter sends; Shift+Enter is a newline; never send mid-IME composition.
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              !e.isComposing &&
              e.keyCode !== 229
            ) {
              e.preventDefault();
              if (!e.repeat) send();
            }
          }}
        />
        <button type="submit" disabled={sending}>
          Send
        </button>
      </form>
    </div>
  );
}
