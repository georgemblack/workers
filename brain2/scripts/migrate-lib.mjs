// Turns a brain export into a brain2 import file. Pure: no clock, no
// randomness, so the same export always gives the same import file.

const statuses = ["open", "waiting", "someday", "done", "dropped"];
const closed = ["done", "dropped"];
const priorities = ["high", "normal", "low"];
// Same rule as the task type in brain2: labels must stay true over time.
const relative =
  /\b(today|tonight|tomorrow|yesterday|this|next|weekend|now|soon)\b/i;
const maxBody = 12000;

/**
 * @param {any} data a brain export (GET /api/export)
 * @returns {{ file: import("../src/shared/contracts").ImportFile, summary: Record<string, unknown> }}
 */
export function transform(data) {
  if (data?.format !== "brain-export" || data?.version !== 1)
    throw new Error(
      "Not a brain export (expected format brain-export, version 1)",
    );
  const tables = data.tables ?? {};
  const records = tables.brain_records ?? [];
  const summary = {
    nodes: {},
    labels_dropped: 0,
    parents_dropped: 0,
    sent_to_other: 0,
    context_links_dropped: 0,
    notes_shortened: 0,
  };
  const count = (type, status) => {
    summary.nodes[type] ??= {};
    summary.nodes[type][status] = (summary.nodes[type][status] ?? 0) + 1;
  };

  const seen = new Set();
  const parsed = records.map((record) => {
    if (seen.has(record.id))
      throw new Error(`Two records share the ID ${record.id}`);
    seen.add(record.id);
    return { ...record, data: JSON.parse(record.data) };
  });
  const items = parsed.filter((r) => r.kind === "item");
  const contexts = parsed.filter((r) => r.kind === "context");
  const itemById = new Map(items.map((i) => [i.id, i]));
  const noteIds = new Set(contexts.map((c) => c.id));

  // Areas keep brain's order, which becomes their dashboard order.
  const areas = (tables.brain_areas ?? []).map((a) => ({
    id: "area_" + a.id,
    title: a.title,
  }));
  const areaIds = new Set(areas.map((a) => a.id));
  for (const id of areaIds)
    if (seen.has(id)) throw new Error(`Two records share the ID ${id}`);
  const planRow = (tables.brain_dashboard ?? [])[0];
  const plan = planRow?.plan ? JSON.parse(planRow.plan) : { groups: [] };
  const planArea = new Map();
  for (const group of plan.groups ?? [])
    for (const id of group.item_ids ?? [])
      planArea.set(id, "area_" + group.area_id);

  for (const item of items) {
    const d = item.data;
    if (!statuses.includes(d.status ?? "open"))
      throw new Error(`Item ${item.id} has an unknown status: ${d.status}`);
    if (!priorities.includes(d.priority ?? "normal"))
      throw new Error(`Item ${item.id} has an unknown priority: ${d.priority}`);
  }
  const parentOf = (item) => {
    const id = item.data.parent_id;
    return id && itemById.has(id) ? id : null;
  };

  let needOther = false;
  const tasks = items.map((item) => {
    const d = item.data;
    const status = d.status ?? "open";
    if (d.parent_id && !parentOf(item)) summary.parents_dropped++;
    const parent = parentOf(item);
    const parentClosed = parent
      ? closed.includes(itemById.get(parent).data.status ?? "open")
      : false;
    const topLevel = !parent || parentClosed;

    let label = (d.target ?? "").trim();
    if (label && relative.test(label)) {
      summary.labels_dropped++;
      label = "";
    }
    const about = (d.context_ids ?? []).filter((id) => noteIds.has(id));
    summary.context_links_dropped +=
      (d.context_ids ?? []).length - about.length;

    const links = {};
    if (parent) links.parent = [parent];
    if (about.length) links.about = about;
    if (topLevel) {
      const explicit =
        d.area_id && areaIds.has("area_" + d.area_id)
          ? "area_" + d.area_id
          : null;
      const planned = planArea.get(item.id);
      const area =
        explicit ?? (planned && areaIds.has(planned) ? planned : null);
      if (area) links.in_area = [area];
      else if (!closed.includes(status)) {
        // Every open top-level task needs an area in brain2.
        links.in_area = ["area_other"];
        summary.sent_to_other++;
        needOther = true;
      }
    }
    count("task", status);
    return {
      id: item.id,
      type: "task",
      title: d.title,
      body: d.notes ?? "",
      status,
      props: {
        priority: d.priority ?? "normal",
        due_date: d.due_date ?? null,
        due_label: label ? label.slice(0, 40) : null,
      },
      links,
      updated_at: item.updated_at,
    };
  });

  const notes = contexts.map((context) => {
    const d = context.data;
    let body = d.body ?? "";
    if (d.evidence) body += "\n\nSource: " + d.evidence;
    if (body.length > maxBody) {
      body = body.slice(0, maxBody);
      summary.notes_shortened++;
    }
    count("note", "active");
    return {
      id: context.id,
      type: "note",
      title: d.title,
      body,
      status: "active",
      props: {},
      links: {},
      updated_at: context.updated_at,
    };
  });

  if (needOther && !areaIds.has("area_other"))
    areas.push({ id: "area_other", title: "Other" });
  const areaNodes = areas.map((a) => {
    count("area", "active");
    return {
      id: a.id,
      type: "area",
      title: a.title,
      body: "",
      status: "active",
      props: {},
      links: {},
    };
  });

  return {
    file: {
      format: "brain2-import",
      version: 1,
      // Areas first, then notes, so links to them read naturally in the file.
      nodes: [...areaNodes, ...notes, ...tasks],
      entries: [],
    },
    summary,
  };
}

/**
 * Compares a brain export with brain2's /api/state after import. Returns one
 * line per check: "OK ..." or "MISMATCH ..." with counts and IDs only.
 * `today` is YYYY-MM-DD in the user's timezone (for the priorities rule).
 */
export function compare(data, state, today) {
  const items = (data.tables?.brain_records ?? [])
    .filter((r) => r.kind === "item")
    .map((r) => ({ id: r.id, ...JSON.parse(r.data) }));
  const open = items.filter((i) => !closed.includes(i.status ?? "open"));
  const openIds = new Set(open.map((i) => i.id));
  const lines = [];
  const check = (name, expected, actual) => {
    const want = [...expected].sort();
    const got = [...actual].sort();
    const same =
      want.length === got.length && want.every((id, n) => id === got[n]);
    if (same) lines.push(`OK ${name} (${want.length})`);
    else {
      const missing = want.filter((id) => !got.includes(id));
      const extra = got.filter((id) => !want.includes(id));
      lines.push(
        `MISMATCH ${name}: expected ${want.length}, got ${got.length}` +
          (missing.length ? `; missing ${missing.join(", ")}` : "") +
          (extra.length ? `; extra ${extra.join(", ")}` : ""),
      );
    }
  };

  // brain2's rows, flattened, with each row's child IDs.
  const children = new Map();
  const walk = (rows) => {
    for (const row of rows) {
      children.set(
        row.id,
        row.children.map((c) => c.id),
      );
      walk(row.children);
    }
  };
  const roots = state.views.tasks.areas.flatMap((a) => a.items);
  walk(roots);

  check(
    "open top-level tasks",
    open.filter((i) => !openIds.has(i.parent_id)).map((i) => i.id),
    roots.map((r) => r.id),
  );
  for (const parent of open) {
    const expected = open
      .filter((i) => i.parent_id === parent.id)
      .map((i) => i.id);
    if (expected.length || children.get(parent.id)?.length)
      check(
        `children of ${parent.id}`,
        expected,
        children.get(parent.id) ?? [],
      );
  }
  // brain's rule: open and (high or due within 7 days), or a follow-up that has come due.
  const days = (date) =>
    Math.round((Date.parse(date) - Date.parse(today)) / 86400000);
  const priority = open.filter((i) =>
    i.status === "waiting"
      ? !!i.due_date && i.due_date <= today
      : (i.status ?? "open") === "open" &&
        (i.priority === "high" || (!!i.due_date && days(i.due_date) <= 7)),
  );
  check(
    "priorities",
    priority.map((i) => i.id),
    state.views.tasks.priorities.map((r) => r.id),
  );
  return lines;
}
