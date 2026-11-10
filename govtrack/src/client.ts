// Browser script for both pages: the timeline at "/" and the chat at "/chat".
export const clientScript = String.raw`
const $ = (id) => document.getElementById(id);
let state = {},
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
$("timeline-view").hidden = chat;
$("chat").hidden = !chat;
$("chat-button").hidden = chat;
const query = new URLSearchParams(location.search);
const filters = { politician: query.get("p") || "", sentiment: query.get("s") || "" };
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

// ---- Timeline ----
const labels = { positive: "Positive", neutral: "Neutral", negative: "Negative" };
const monthName = (date) =>
  new Date(date + "T12:00:00Z").toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  });
const dayName = (date) =>
  new Date(date + "T12:00:00Z").toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  });
function host(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
function sourceHTML(source) {
  // Only web links are stored, but check again before rendering an anchor.
  if (!/^https?:\/\//i.test(source.url)) return "";
  return (
    '<a href="' +
    esc(source.url) +
    '" target="_blank" rel="noopener noreferrer">' +
    esc(source.title || host(source.url)) +
    "</a>" +
    (source.title ? ' <span class="host">' + esc(host(source.url)) + "</span>" : "")
  );
}
function eventHTML(event, people) {
  const person = people.get(event.politician_id);
  return (
    '<li class="event ' +
    esc(event.sentiment) +
    '"><div class="meta"><span class="badge">' +
    esc(labels[event.sentiment]) +
    "</span> " +
    esc(dayName(event.date)) +
    (filters.politician || !person
      ? ""
      : " · <strong>" + esc(person.name) + "</strong>" + (person.office ? ", " + esc(person.office) : "")) +
    '</div><p class="summary">' +
    esc(event.summary) +
    '</p><ul class="sources">' +
    event.sources.map((s) => "<li>" + sourceHTML(s) + "</li>").join("") +
    "</ul></li>"
  );
}
function filtersHTML() {
  const options = state.politicians
    .map(
      (p) =>
        '<option value="' +
        esc(p.id) +
        '"' +
        (p.id === filters.politician ? " selected" : "") +
        ">" +
        esc(p.name) +
        "</option>",
    )
    .join("");
  const chips = [["", "All"], ["positive", "Positive"], ["neutral", "Neutral"], ["negative", "Negative"]]
    .map(
      ([value, label]) =>
        '<button type="button" data-sentiment="' +
        value +
        '" aria-pressed="' +
        (filters.sentiment === value) +
        '">' +
        label +
        "</button>",
    )
    .join("");
  return (
    '<select id="politician" aria-label="Politician"><option value="">All politicians</option>' +
    options +
    '</select><div class="chips" role="group" aria-label="Sentiment">' +
    chips +
    "</div>"
  );
}
function profileHTML() {
  const p = state.politicians.find((p) => p.id === filters.politician);
  if (!p) return "";
  return (
    '<section class="profile"><h2>' +
    esc(p.name) +
    "</h2>" +
    (p.office ? '<div class="office">' + esc(p.office) + "</div>" : "") +
    '<div class="tally"><span class="positive">' +
    p.positive +
    ' positive</span> · <span class="neutral">' +
    p.neutral +
    ' neutral</span> · <span class="negative">' +
    p.negative +
    " negative</span></div>" +
    (p.notes ? '<p class="notes">' + esc(p.notes) + "</p>" : "") +
    "</section>"
  );
}
function timelineHTML() {
  const people = new Map(state.politicians.map((p) => [p.id, p]));
  const events = state.events.filter(
    (e) =>
      (!filters.politician || e.politician_id === filters.politician) &&
      (!filters.sentiment || e.sentiment === filters.sentiment),
  );
  if (!events.length)
    return (
      '<p class="empty">' +
      (state.events.length
        ? "No events match these filters."
        : "No events yet. Open Chat and share a link to add one.") +
      "</p>"
    );
  let html = "",
    month = "";
  for (const event of events) {
    const name = monthName(event.date);
    if (name !== month) {
      html += (month ? "</ol></section>" : "") + '<section class="month"><h2>' + esc(name) + '</h2><ol class="events">';
      month = name;
    }
    html += eventHTML(event, people);
  }
  return html + "</ol></section>";
}
function renderTimeline() {
  if (!state.politicians) return;
  if (filters.politician && !state.politicians.some((p) => p.id === filters.politician))
    filters.politician = "";
  $("filters").innerHTML = filtersHTML();
  $("profile").innerHTML = profileHTML();
  $("timeline").innerHTML = timelineHTML();
}
function setFilter(key, value) {
  filters[key] = value;
  const params = new URLSearchParams();
  if (filters.politician) params.set("p", filters.politician);
  if (filters.sentiment) params.set("s", filters.sentiment);
  history.replaceState(null, "", "/" + (params.size ? "?" + params : ""));
  renderTimeline();
}
$("filters").addEventListener("change", (e) => {
  if (e.target.id === "politician") setFilter("politician", e.target.value);
});
$("filters").addEventListener("click", (e) => {
  const button = e.target.closest("[data-sentiment]");
  if (button) setFilter("sentiment", button.dataset.sentiment);
});

// ---- Chat ----
function renderChat() {
  const followChat =
    !chatLoaded ||
    window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 80;
  const messages = state.messages || [];
  $("retry").hidden = !messages.some((m) => m.result.status === "parked");
  $("messages").innerHTML = messages.length
    ? messages
        .map(
          (m) =>
            '<article class="message"><div class="speaker">You · ' +
            new Date(m.created_at).toLocaleString() +
            '</div><div class="message-text">' +
            esc(m.text) +
            '</div><div class="reply"><div class="speaker">govtrack</div><div class="markdown">' +
            (m.html ||
              esc(
                m.result.text ||
                  (m.result.status === "unanswered"
                    ? "Could not finish: " +
                      (m.result.detail || m.result.reason || "unknown error") +
                      ". Send a follow-up to try again."
                    : m.result.status === "parked"
                      ? "Processing paused."
                      : "Working on it…"),
              )) +
            "</div></div></article>",
        )
        .join("")
    : '<p class="empty">Share a link and say what a politician did, e.g. “Ward 3 alderperson voted against the bike lane plan, bad call: https://…”</p>';
  chatLoaded = true;
  if (followChat) window.scrollTo(0, document.documentElement.scrollHeight);
}
async function refresh() {
  if (refreshing) return;
  refreshing = true;
  try {
    const next = await api(chat ? "/api/chat" : "/api/timeline");
    if (JSON.stringify(next) !== JSON.stringify(state)) {
      state = next;
      chat ? renderChat() : renderTimeline();
    }
    $("error").textContent = "";
  } catch (e) {
    $("error").textContent = e.message;
  } finally {
    refreshing = false;
  }
}
async function send(event) {
  event.preventDefault();
  const input = $("chat-text");
  if (sending) return;
  sending = true;
  const text = input.value.trim();
  // Keep the draft and its ID until the server accepts it, so a retry can't duplicate it.
  let stored;
  try {
    stored = JSON.parse(localStorage.getItem("govtrack-pending") || "null");
  } catch {}
  const payload =
    stored?.text === text
      ? stored
      : { id: crypto.randomUUID(), text, source: "chat" };
  try {
    localStorage.setItem("govtrack-pending", JSON.stringify(payload));
  } catch {}
  try {
    await api("/api/messages", "POST", payload);
    input.value = "";
    try {
      localStorage.removeItem("govtrack-pending");
    } catch {}
    await refresh();
  } catch (e) {
    $("error").textContent =
      e.message + " Your draft is saved; send again to retry.";
  } finally {
    sending = false;
  }
}
$("compose").onsubmit = send;
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
  const draft = JSON.parse(localStorage.getItem("govtrack-pending") || "null");
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
