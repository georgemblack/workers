export const clientScript = String.raw`
const $ = (id) => document.getElementById(id);
let state = { items: [], messages: [] },
  sending = false,
  refreshing = false,
  chatLoaded = false;
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const chat = location.pathname === "/chat";
$("dashboard").hidden = chat;
$("chat").hidden = !chat;
$("chat-button").hidden = chat;
$("back-button").hidden = !chat;
async function api(path, method = "GET", body) {
  const res = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw Error(data.error || "Request failed");
  return data;
}
function itemHTML(item) {
  const parent = state.items.find((x) => x.id === item.parent_id);
  return (
    '<article class="item"><div class="item-line"><span class="title">' +
    esc(item.title) +
    "</span></div>" +
    (parent ? '<div class="meta">↳ ' + esc(parent.title) + "</div>" : "") +
    (item.timing || item.due_date || item.scheduled_at || item.follow_up_at
      ? '<div class="meta">' +
        esc(
          item.follow_up_at
            ? "Follow up " + item.follow_up_at
            : item.due_date || item.scheduled_at || item.timing,
        ) +
        (item.timing_source === "inherited" ? " · from related plans" : "") +
        "</div>"
      : "") +
    (item.needs_clarification
      ? '<p class="why">Needs your input: ' +
        esc(item.needs_clarification) +
        "</p>"
      : "") +
    "</article>"
  );
}
function dashboardHTML() {
  const dashboard = state.dashboard;
  if (!dashboard)
    return (
      '<p class="empty">' +
      (state.items.some((i) => !["done", "dropped"].includes(i.status))
        ? "Organizing your list…"
        : "Nothing on your list.") +
      "</p>"
    );
  const fold = (group, key, label, items) =>
    items.length
      ? '<details class="fold" id="fold-' +
        esc(group.id) +
        "-" +
        key +
        '"><summary>' +
        label +
        " · " +
        items.length +
        "</summary>" +
        items.map(itemHTML).join("") +
        "</details>"
      : "";
  const focus = dashboard.highlights.length
    ? '<section class="focus"><h2>Needs your attention</h2>' +
      dashboard.highlights
        .map(
          (h) =>
            '<div class="focus-item">' +
            itemHTML(h.item) +
            '<p class="focus-reason">' +
            esc(h.reason) +
            "</p></div>",
        )
        .join("") +
      "</section>"
    : "";
  return (
    focus +
      dashboard.groups
        .map(
          (group) =>
            '<section class="area"><div class="area-heading"><h2>' +
            esc(group.title) +
            '</h2><span class="area-count">' +
            group.count +
            " " +
            (group.count === 1 ? "item" : "items") +
            (group.highlighted_count
              ? " · " + group.highlighted_count + " shown above"
              : "") +
            "</span></div>" +
            (group.summary
              ? '<p class="area-summary">' + esc(group.summary) + "</p>"
              : "") +
            group.featured.map(itemHTML).join("") +
            fold(group, "remaining", "More to do", group.remaining) +
            fold(group, "waiting", "Waiting", group.waiting) +
            fold(group, "optional", "Later & optional", group.optional) +
            "</section>",
        )
        .join("") || '<p class="empty">Nothing on your list.</p>'
  );
}
function render() {
  const followChat =
    chat &&
    (!chatLoaded ||
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80);
  const expanded = [
    ...(document.querySelectorAll?.("#sections details[id][open]") || []),
  ].map((el) => el.id);
  if (!chat) $("sections").innerHTML = dashboardHTML();
  for (const id of expanded) {
    const el = document.getElementById(id);
    if (el) el.open = true;
  }
  const pending = (state.messages || []).filter(
    (m) => m.result.status === "parked",
  );
  $("retry").hidden = !pending.length;
  $("messages").innerHTML =
    (state.messages || [])
      .map(
        (m) =>
          '<article class="message"><div class="speaker">You · ' +
          esc(m.source) +
          " · " +
          new Date(m.created_at).toLocaleString() +
          '</div><div class="message-text">' +
          esc(m.text) +
          '</div><div class="reply"><div class="speaker">brain</div><div class="markdown">' +
          (m.html ||
            esc(
              m.result.text ||
                (m.result.status === "unanswered"
                  ? "Could not finish: " +
                    (m.result.reason || "unknown error") +
                    ". Send a follow-up to try again."
                  : m.result.status === "parked"
                    ? "Processing paused."
                    : "Working on it…"),
            )) +
          "</div></div></article>",
      )
      .join("") || "";
  if (chat) {
    chatLoaded = true;
    if (followChat) window.scrollTo(0, document.documentElement.scrollHeight);
  }
}
async function refresh() {
  if (refreshing) return;
  refreshing = true;
  try {
    const next = await api(chat ? "/api/chat" : "/api/dashboard");
    if (JSON.stringify(next) !== JSON.stringify(state)) {
      state = next;
      render();
    }
    $("error").textContent = "";
  } catch (e) {
    $("error").textContent = e.message;
  } finally {
    refreshing = false;
  }
}
async function capture(event, input) {
  event.preventDefault();
  if (sending) return;
  sending = true;
  const text = input.value.trim();
  let stored;
  try {
    stored = JSON.parse(localStorage.getItem("brain-pending") || "null");
  } catch {}
  const payload =
    stored?.text === text
      ? stored
      : { id: crypto.randomUUID(), text, source: "chat" };
  localStorage.setItem("brain-pending", JSON.stringify(payload));
  try {
    await api("/api/messages", "POST", payload);
    input.value = "";
    localStorage.removeItem("brain-pending");
    await refresh();
  } catch (e) {
    $("error").textContent =
      e.message + " Your draft is saved; send again to retry.";
  } finally {
    sending = false;
  }
}
$("compose").onsubmit = (e) => capture(e, $("chat-text"));
$("chat-text").onkeydown = (event) => {
  if (
    event.key === "Enter" &&
    !event.shiftKey &&
    !event.isComposing &&
    event.keyCode !== 229
  ) {
    event.preventDefault();
    if (!event.repeat && !sending && $("chat-text").value.trim())
      $("compose").requestSubmit();
  }
};
try {
  const draft = JSON.parse(localStorage.getItem("brain-pending") || "null");
  if (draft) $("chat-text").value = draft.text;
} catch {}
$("retry").onclick = async () => {
  const button = $("retry");
  button.disabled = true;
  try {
    await api("/api/retry", "POST", {});
    await refresh();
  } catch (e) {
    $("error").textContent = e.message;
  } finally {
    button.disabled = false;
  }
};
refresh();
setInterval(() => {
  if (!document.hidden) refresh();
}, 5000);
`;
