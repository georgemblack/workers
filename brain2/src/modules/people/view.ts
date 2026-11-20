import type { Store } from "../../store";
import type { NodeRecord, PeopleView, PersonRow } from "../../shared/contracts";

const byTitle = (a: NodeRecord, b: NodeRecord) =>
  a.title.localeCompare(b.title);

export function activePeople(store: Store) {
  return store.listNodes({ type: "person", status: ["active"] });
}
export function activeGroups(store: Store) {
  return store.listNodes({ type: "group", status: ["active"] });
}

export function personRow(node: NodeRecord): PersonRow {
  return {
    id: node.id,
    name: node.title,
    aliases: (node.props.aliases as string[] | undefined) ?? [],
    subtitle: (node.props.how_i_know as string | undefined) ?? "",
  };
}

const isLeap = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

/**
 * The next time a birthday ("MM-DD" or "YYYY-MM-DD") comes round on or after
 * today, as YYYY-MM-DD. Feb 29 falls on Feb 28 in other years.
 */
export function nextBirthday(birthday: string, today: string) {
  const monthDay = birthday.slice(-5);
  const on = (year: number) =>
    monthDay === "02-29" && !isLeap(year)
      ? `${year}-02-28`
      : `${year}-${monthDay}`;
  const year = Number(today.slice(0, 4));
  return on(year) >= today ? on(year) : on(year + 1);
}
const daysBetween = (from: string, to: string) =>
  Math.round((Date.parse(to) - Date.parse(from)) / 86400000);

export function view(store: Store, today: string): PeopleView {
  const people = activePeople(store);
  const groups = activeGroups(store);
  const nodes = new Map([...people, ...groups].map((n) => [n.id, n]));
  const kind = (node: NodeRecord) => node.props.kind as string;
  const membersOf = (groupId: string, type: string) =>
    store
      .backlinks(groupId, "member_of")
      .map((b) => b.node)
      .filter((n) => n.type === type && n.status === "active")
      .sort(byTitle);

  // Open follow-ups, grouped by the first person or household they are about.
  const groupsBySubject = new Map<
    string,
    {
      subject: NodeRecord;
      followups: { id: string; title: string; since: string }[];
    }
  >();
  for (const followup of store.listNodes({
    type: "followup",
    status: ["open"],
  })) {
    const subject = store.getNode(followup.links.about?.[0] ?? "");
    if (!subject) continue;
    const entry = groupsBySubject.get(subject.id) ?? { subject, followups: [] };
    entry.followups.push({
      id: followup.id,
      title: followup.title,
      since: followup.props.since as string,
    });
    groupsBySubject.set(subject.id, entry);
  }
  const newest = (list: { since: string }[]) =>
    list.reduce((max, f) => (f.since > max ? f.since : max), "");
  const catch_up = [...groupsBySubject.values()]
    .map(({ subject, followups }) => ({
      person: personRow(subject),
      followups: followups.sort((a, b) => b.since.localeCompare(a.since)),
    }))
    .sort((a, b) => newest(b.followups).localeCompare(newest(a.followups)));

  const birthdays = people
    .filter((p) => p.props.birthday)
    .map((p) => {
      const date = nextBirthday(p.props.birthday as string, today);
      return {
        id: p.id,
        name: p.title,
        date,
        in_days: daysBetween(today, date),
      };
    })
    .filter((b) => b.in_days <= 30)
    .sort((a, b) => a.in_days - b.in_days || a.name.localeCompare(b.name));

  const recent = store
    .entriesFor([...nodes.keys()], { limit: 10 })
    .timeline.map((entry) => ({
      id: entry.id,
      text: entry.text,
      occurred_on: entry.occurred_on!,
      people: entry.node_ids
        .map((id) => nodes.get(id))
        .filter((n) => n !== undefined)
        .map((n) => ({ id: n.id, name: n.title })),
    }));

  // Circles hold households and people; anyone in no circle, directly or
  // through their household, goes under "Everyone else".
  const placed = new Set<string>();
  const households = (members: NodeRecord[]) =>
    members.map((household) => {
      placed.add(household.id);
      const inside = membersOf(household.id, "person");
      for (const p of inside) placed.add(p.id);
      return {
        id: household.id,
        title: household.title,
        people: inside.map(personRow),
      };
    });
  const circles: PeopleView["circles"] = groups
    .filter((g) => kind(g) === "circle")
    .sort(byTitle)
    .map((circle) => {
      const homes = households(
        membersOf(circle.id, "group").filter((g) => kind(g) === "household"),
      );
      const shown = new Set(homes.flatMap((h) => h.people.map((p) => p.id)));
      const direct = membersOf(circle.id, "person").filter(
        (p) => !shown.has(p.id),
      );
      for (const p of direct) placed.add(p.id);
      return {
        id: circle.id,
        title: circle.title,
        households: homes,
        people: direct.map(personRow),
      };
    })
    .filter((c) => c.households.length || c.people.length);
  const looseHomes = households(
    groups
      .filter((g) => kind(g) === "household" && !placed.has(g.id))
      .sort(byTitle),
  );
  const loosePeople = people.filter((p) => !placed.has(p.id)).sort(byTitle);
  if (looseHomes.length || loosePeople.length)
    circles.push({
      id: null,
      title: "Everyone else",
      households: looseHomes,
      people: loosePeople.map(personRow),
    });

  return { catch_up, birthdays, recent, circles };
}
