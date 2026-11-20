import { useState } from "preact/hooks";
import type { PeopleView as View, PersonRow } from "../../shared/contracts";
import { filterPeople, type Ref } from "../logic";

const shortDate = (date: string) =>
  new Date(date + "T12:00:00Z").toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });

function Person({
  person,
  onOpen,
}: {
  person: PersonRow;
  onOpen: (ref: Ref) => void;
}) {
  return (
    <li class="item">
      <button
        class="pick"
        onClick={() => onOpen({ id: person.id, title: person.name })}
      >
        {person.name}
      </button>
      {person.subtitle && <div class="meta">{person.subtitle}</div>}
    </li>
  );
}

export function PeopleView({
  view,
  onOpen,
  onPick,
}: {
  view: View;
  onOpen: (ref: Ref) => void;
  onPick: (ref: Ref) => void;
}) {
  const [query, setQuery] = useState("");
  // Every person once, for the search list.
  const everyone = [
    ...new Map(
      view.circles
        .flatMap((c) => [...c.households.flatMap((h) => h.people), ...c.people])
        .map((p) => [p.id, p]),
    ).values(),
  ].sort((a, b) => a.name.localeCompare(b.name));
  const filter = (
    <input
      class="filter"
      type="search"
      placeholder="Find someone…"
      aria-label="Find someone"
      value={query}
      onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
    />
  );
  if (query.trim()) {
    const found = filterPeople(everyone, query);
    return (
      <>
        {filter}
        {found.length ? (
          <section class="section">
            <ul class="items">
              {found.map((p) => (
                <Person key={p.id} person={p} onOpen={onOpen} />
              ))}
            </ul>
          </section>
        ) : (
          <p class="empty">No one matches.</p>
        )}
      </>
    );
  }
  if (!everyone.length && !view.catch_up.length)
    return <p class="empty">No one yet. Tell me about someone.</p>;
  return (
    <>
      {filter}
      {view.catch_up.length > 0 && (
        <section class="section priorities">
          <h2>Catch up</h2>
          <ul class="items">
            {view.catch_up.map(({ person, followups }) => (
              <li class="item" key={person.id}>
                <button
                  class="pick"
                  onClick={() => onOpen({ id: person.id, title: person.name })}
                >
                  {person.name}
                </button>
                <ul class="items">
                  {followups.map((f) => (
                    <li class="item" key={f.id}>
                      <button
                        class="pick"
                        onClick={() => onPick({ id: f.id, title: f.title })}
                      >
                        {f.title}
                      </button>
                      <div class="meta">Since {shortDate(f.since)}</div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}
      {view.birthdays.length > 0 && (
        <section class="section">
          <h2>Birthdays</h2>
          <ul class="items">
            {view.birthdays.map((b) => (
              <li class="item" key={b.id}>
                <button
                  class="pick"
                  onClick={() => onOpen({ id: b.id, title: b.name })}
                >
                  {b.name}
                </button>
                <div class="meta">
                  {b.in_days === 0
                    ? "Today"
                    : b.in_days === 1
                      ? "Tomorrow"
                      : `${shortDate(b.date)}, in ${b.in_days} days`}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {view.recent.length > 0 && (
        <section class="section">
          <h2>Recent</h2>
          <ul class="items">
            {view.recent.map((r) => (
              <li class="item" key={r.id}>
                <div class="meta">
                  {shortDate(r.occurred_on)} ·{" "}
                  {r.people.map((p) => p.name).join(", ")}
                </div>
                <div class="title">{r.text}</div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {view.circles.map((circle) => (
        <section class="section" key={circle.id ?? "everyone"}>
          <h2>{circle.title}</h2>
          {circle.households.map((h) => (
            <div class="household" key={h.id}>
              <button
                class="pick subheading"
                onClick={() => onOpen({ id: h.id, title: h.title })}
              >
                {h.title}
              </button>
              <ul class="items">
                {h.people.map((p) => (
                  <Person key={p.id} person={p} onOpen={onOpen} />
                ))}
              </ul>
            </div>
          ))}
          {circle.people.length > 0 && (
            <ul class="items">
              {circle.people.map((p) => (
                <Person key={p.id} person={p} onOpen={onOpen} />
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}
