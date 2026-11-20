import { useEffect, useRef, useState } from "preact/hooks";
import type { StateResponse } from "../../shared/contracts";
import { api, saved } from "../api";
import {
  addRef,
  outgoingRefs,
  pendingMessage,
  pollInterval,
  removeRef,
  type Pending,
  type Ref,
} from "../logic";
import { Chat } from "./Chat";
import { Dashboard } from "./Dashboard";

const wideQuery = "(min-width: 900px)";
const readPending = (): Pending | null => {
  try {
    return JSON.parse(saved.get("brain2-pending") ?? "null");
  } catch {
    return null;
  }
};

export function App() {
  const [state, setState] = useState<StateResponse | null>(null);
  const [error, setError] = useState("");
  const [pane, setPane] = useState(
    saved.get("brain2-pane") === "chat" ? "chat" : "board",
  );
  const [tab, setTab] = useState(saved.get("brain2-tab") ?? "tasks");
  const [detail, setDetail] = useState<Ref | null>(null);
  // Whether the open person is sent along with messages (the chip's ×).
  const [detailRef, setDetailRef] = useState(true);
  const [refs, setRefs] = useState<Ref[]>([]);
  const [focusKey, setFocusKey] = useState(0);
  const [wide, setWide] = useState(() => matchMedia(wideQuery).matches);
  const current = useRef<StateResponse | null>(null);
  const timer = useRef<number>();

  useEffect(() => {
    const media = matchMedia(wideQuery);
    const update = () => setWide(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Poll for changes: often while a reply is in progress, rarely otherwise,
  // and not at all while the page is hidden.
  const poll = async () => {
    clearTimeout(timer.current);
    if (!document.hidden) {
      try {
        const rev = current.current?.rev;
        const next = await api<StateResponse>(
          rev === undefined ? "/api/state" : `/api/state?rev=${rev}`,
        );
        if (next) {
          current.current = next;
          setState(next);
        }
        setError("");
      } catch (e) {
        setError((e as Error).message);
      }
    }
    timer.current = window.setTimeout(poll, pollInterval(current.current));
  };
  useEffect(() => {
    poll();
    const onVisible = () => !document.hidden && poll();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const choosePane = (next: string) => {
    setPane(next);
    saved.set("brain2-pane", next);
  };
  const chooseTab = (next: string) => {
    setTab(next);
    saved.set("brain2-tab", next);
  };
  const open = (ref: Ref | null) => {
    setDetail(ref);
    setDetailRef(true);
  };
  const pick = (ref: Ref) => {
    setRefs((list) => addRef(list, ref));
    setFocusKey((k) => k + 1);
    if (!wide) choosePane("chat");
  };
  const openRef = detail && detailRef ? detail : null;
  const chips = openRef
    ? [openRef, ...refs.filter((r) => r.id !== openRef.id)]
    : refs;

  const send = async (text: string) => {
    const message = pendingMessage(
      readPending(),
      text,
      outgoingRefs(refs, openRef),
      () => crypto.randomUUID(),
    );
    // Saved first, so a retry after a lost response reuses the same ID.
    saved.set("brain2-pending", JSON.stringify(message));
    try {
      await api("/api/messages", { ...message, source: "chat" });
      saved.set("brain2-pending", null);
      setRefs([]);
      setError("");
      poll();
      return true;
    } catch (e) {
      setError(
        `${(e as Error).message} Your draft is saved; send again to retry.`,
      );
      return false;
    }
  };
  const retry = async () => {
    try {
      await api("/api/retry", {});
      poll();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const chat = (
    <Chat
      messages={state?.messages ?? []}
      chips={chips}
      error={error}
      draft={readPending()?.text ?? ""}
      focusKey={focusKey}
      onRemoveChip={(id) =>
        openRef?.id === id
          ? setDetailRef(false)
          : setRefs((list) => removeRef(list, id))
      }
      onSend={send}
      onRetry={retry}
    />
  );
  const board = state ? (
    <Dashboard
      state={state}
      tab={tab}
      detail={detail}
      onTab={chooseTab}
      onOpen={open}
      onPick={pick}
      onError={setError}
    />
  ) : (
    <p class="empty">Loading…</p>
  );
  if (wide)
    return (
      <div class="layout">
        <section class="pane chat-pane">{chat}</section>
        <section class="pane board-pane">
          <div class="board">{board}</div>
        </section>
      </div>
    );
  return (
    <div class="mobile">
      <section class={`pane ${pane}-pane`}>
        {pane === "chat" ? chat : <div class="board">{board}</div>}
      </section>
      <nav class="toggle">
        {[
          ["chat", "Chat"],
          ["board", "Board"],
        ].map(([id, label]) => (
          <button
            key={id}
            class={pane === id ? "active" : ""}
            aria-pressed={pane === id}
            onClick={() => choosePane(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
