export const styles = String.raw`
:root {
  color-scheme: light dark;
  font:
    15px/1.6 system-ui,
    sans-serif;
  --bg: #fff;
  --text: #262626;
  --muted: #737373;
  --line: #e5e5e5;
  --positive: #2f7d4a;
  --negative: #b4433a;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #191919;
    --text: #e5e5e5;
    --muted: #a3a3a3;
    --line: #353535;
    --positive: #5fb67c;
    --negative: #e07a6e;
  }
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
}
main {
  max-width: 720px;
  margin: 0 auto;
  padding: 28px 24px 96px;
}
a,
button,
input,
textarea,
select {
  color: inherit;
  font: inherit;
}
input,
textarea,
select {
  font-size: 16px;
}
a {
  text-decoration: none;
}
button,
.chat-button {
  cursor: pointer;
  border: 1px solid var(--line);
  border-radius: 5px;
  background: var(--bg);
  padding: 5px 10px;
}
button:hover,
.chat-button:hover {
  border-color: var(--muted);
}
a:focus-visible,
button:focus-visible,
textarea:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid var(--muted);
  outline-offset: 3px;
}
.chat-button {
  position: fixed;
  right: 24px;
  bottom: 24px;
  font-size: 13px;
}
.top {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 24px 0;
}
.brand {
  font-weight: 600;
  letter-spacing: -0.01em;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 0 0 28px;
}
select {
  max-width: 100%;
  padding: 5px 8px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 5px;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chips button {
  font-size: 13px;
  border-radius: 999px;
  padding: 3px 11px;
}
.chips button[aria-pressed="true"] {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}
.profile {
  margin: 0 0 32px;
}
.profile h2 {
  font-size: 22px;
  line-height: 1.25;
  margin: 0;
}
.office,
.notes,
.host {
  color: var(--muted);
}
.tally {
  font-size: 14px;
  margin-top: 6px;
}
.notes {
  font-size: 14px;
  margin: 8px 0 0;
  white-space: pre-wrap;
}
.month {
  margin: 0 0 28px;
}
.month h2 {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin: 0 0 10px;
}
/* Events hang off a vertical rail, each marked with a dot in its sentiment color. */
.events {
  list-style: none;
  margin: 0 0 0 5px;
  padding: 0 0 0 20px;
  border-left: 2px solid var(--line);
}
.event {
  position: relative;
  padding: 0 0 22px;
}
.event::before {
  content: "";
  position: absolute;
  left: -27px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--tone);
  box-shadow: 0 0 0 3px var(--bg);
}
.positive {
  --tone: var(--positive);
}
.neutral {
  --tone: var(--muted);
}
.negative {
  --tone: var(--negative);
}
.tally .positive,
.tally .neutral,
.tally .negative {
  color: var(--tone);
}
.meta {
  font-size: 13px;
  color: var(--muted);
}
.meta strong {
  color: var(--text);
  font-weight: 600;
}
.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--tone);
  margin-right: 4px;
}
.summary {
  margin: 2px 0 4px;
  overflow-wrap: anywhere;
}
.sources {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
}
.sources a {
  text-decoration: underline;
  text-decoration-color: var(--line);
  text-underline-offset: 2px;
  overflow-wrap: anywhere;
}
.sources a:hover {
  text-decoration-color: var(--muted);
}
.message-text {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.empty,
.speaker {
  color: var(--muted);
  font-size: 13px;
}
.message {
  margin: 24px 0;
}
.message > .message-text {
  width: fit-content;
  max-width: 90%;
  margin-left: auto;
  padding: 10px 14px;
  border-radius: 16px;
  background: var(--line);
}
.message > .speaker {
  text-align: right;
}
.speaker {
  margin-bottom: 4px;
}
.reply {
  margin-top: 14px;
}
.markdown {
  overflow-wrap: anywhere;
}
.markdown > :first-child {
  margin-top: 0;
}
.markdown > :last-child {
  margin-bottom: 0;
}
.markdown p,
.markdown ul,
.markdown ol,
.markdown pre,
.markdown blockquote {
  margin: 0 0 12px;
}
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  color: inherit;
  font-size: 1em;
  margin: 16px 0 8px;
}
.markdown a {
  text-decoration: underline;
}
.markdown pre {
  overflow-x: auto;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 5px;
  white-space: pre;
}
.markdown code {
  font-size: 0.9em;
}
.markdown blockquote {
  padding-left: 12px;
  border-left: 2px solid var(--line);
  color: var(--muted);
}
.markdown table {
  display: block;
  overflow-x: auto;
  border-collapse: collapse;
  margin-bottom: 12px;
}
.markdown th,
.markdown td {
  padding: 4px 8px;
  border: 1px solid var(--line);
  text-align: left;
}
.composer {
  margin-top: 32px;
}
textarea {
  width: 100%;
  padding: 8px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 5px;
}
textarea {
  min-height: 90px;
  resize: vertical;
}
.composer button {
  margin-top: 8px;
}
#error {
  color: #b95043;
  white-space: pre-wrap;
}
#error:empty {
  display: none;
}
@media (max-width: 480px) {
  main {
    padding: 24px 16px 96px;
  }
  .top {
    padding: 16px 16px 0;
  }
}
`;
