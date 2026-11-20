export const clientScript = String.raw`
const $ = (id) => document.getElementById(id);
let state = { messages: [] },
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
function render() {
  const followChat =
    !chatLoaded ||
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 80;
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
          '</div><div class="reply"><div class="speaker">brain2</div><div class="markdown">' +
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
      .join("") || "";
  chatLoaded = true;
  if (followChat) window.scrollTo(0, document.documentElement.scrollHeight);
}
async function refresh() {
  if (refreshing) return;
  refreshing = true;
  try {
    const next = await api("/api/chat");
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
    stored = JSON.parse(localStorage.getItem("brain2-pending") || "null");
  } catch {}
  const payload =
    stored?.text === text
      ? stored
      : { id: crypto.randomUUID(), text, source: "chat" };
  localStorage.setItem("brain2-pending", JSON.stringify(payload));
  try {
    await api("/api/messages", "POST", payload);
    input.value = "";
    localStorage.removeItem("brain2-pending");
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
  const draft = JSON.parse(localStorage.getItem("brain2-pending") || "null");
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
