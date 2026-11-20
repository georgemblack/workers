import { useEffect, useState } from "preact/hooks";
import type { LinkedNode, NodeDetail } from "../../shared/contracts";
import { api } from "../api";
import type { Ref } from "../logic";

const date = (value: string) =>
  new Date(value + "T12:00:00Z").toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
const closedTask = ["done", "dropped"];

/** How a related person stands to this one, read from the relation's direction. */
function relation(link: LinkedNode, outgoing: boolean) {
  if (link.rel === "spouse_of") return "Spouse";
  if (link.rel === "sibling_of") return "Sibling";
  if (link.rel === "child_of") return outgoing ? "Parent" : "Child";
  return null;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: preact.ComponentChildren;
}) {
  return (
    <section class="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function PersonDetail({
  id,
  rev,
  onBack,
  onOpen,
  onPick,
  onError,
}: {
  id: string;
  rev: number;
  onBack: () => void;
  onOpen: (ref: Ref) => void;
  onPick: (ref: Ref) => void;
  onError: (message: string) => void;
}) {
  const [detail, setDetail] = useState<NodeDetail | null>(null);
  // Refetch whenever the data changes.
  useEffect(() => {
    let live = true;
    api<NodeDetail>(`/api/nodes/${encodeURIComponent(id)}`)
      .then((d) => live && setDetail(d))
      .catch((e) => onError(e.message));
    return () => {
      live = false;
    };
  }, [id, rev]);
  if (!detail || detail.node.id !== id) return <p class="empty">Loading…</p>;

  const { node } = detail;
  const family = [
    ...detail.linked.map((l) => ({ link: l, label: relation(l, true) })),
    ...detail.backlinks.map((l) => ({ link: l, label: relation(l, false) })),
  ].filter((f) => f.label && f.link.type === "person");
  const groups = detail.linked.filter((l) => l.rel === "member_of");
  const members = detail.backlinks.filter((l) => l.rel === "member_of");
  const followups = detail.backlinks.filter(
    (l) => l.type === "followup" && l.status === "open",
  );
  const tasks = detail.backlinks.filter(
    (l) => l.type === "task" && !closedTask.includes(l.status),
  );
  const open = (l: LinkedNode) => (
    <button class="pick" onClick={() => onOpen({ id: l.id, title: l.title })}>
      {l.title}
    </button>
  );
  return (
    <article class="detail">
      <button class="back" onClick={onBack}>
        ← People
      </button>
      <h1>{node.title}</h1>
      {typeof node.props.how_i_know === "string" && node.props.how_i_know && (
        <p class="meta">{node.props.how_i_know}</p>
      )}
      {node.body && <p class="body">{node.body}</p>}
      {(family.length > 0 || groups.length > 0) && (
        <Section title="Family">
          <ul class="items">
            {family.map(({ link, label }) => (
              <li class="item" key={link.rel + link.id}>
                {open(link)}
                <div class="meta">{label}</div>
              </li>
            ))}
            {groups.map((g) => (
              <li class="item" key={"g" + g.id}>
                {open(g)}
              </li>
            ))}
          </ul>
        </Section>
      )}
      {members.length > 0 && (
        <Section title="Members">
          <ul class="items">
            {members.map((m) => (
              <li class="item" key={m.id}>
                {open(m)}
              </li>
            ))}
          </ul>
        </Section>
      )}
      {followups.length > 0 && (
        <Section title="Ask about">
          <ul class="items">
            {followups.map((f) => (
              <li class="item" key={f.id}>
                <button
                  class="pick"
                  onClick={() => onPick({ id: f.id, title: f.title })}
                >
                  {f.title}
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {detail.facts.length > 0 && (
        <Section title="Facts">
          <ul class="facts">
            {detail.facts.map((e) => (
              <li key={e.id}>{e.text}</li>
            ))}
          </ul>
        </Section>
      )}
      {detail.timeline.length > 0 && (
        <Section title="Timeline">
          <ul class="items">
            {detail.timeline.map((e) => (
              <li class="item" key={e.id}>
                <div class="meta">{date(e.occurred_on!)}</div>
                <div class="title">{e.text}</div>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {tasks.length > 0 && (
        <Section title="Tasks">
          <ul class="items">
            {tasks.map((t) => (
              <li class="item" key={t.id}>
                <button
                  class="pick"
                  onClick={() => onPick({ id: t.id, title: t.title })}
                >
                  {t.title}
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}
