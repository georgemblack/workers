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
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #191919;
    --text: #e5e5e5;
    --muted: #a3a3a3;
    --line: #353535;
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
  padding: 56px 24px 96px;
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
.section {
  margin: 0 0 36px;
}
.section h2 {
  font-size: 19px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 6px;
}
.priorities {
  padding: 16px 20px 6px;
  border: 1px solid var(--line);
  border-left: 3px solid #9b8157;
  border-radius: 8px;
}
@media (max-width: 480px) {
  .priorities {
    padding: 14px 14px 4px;
  }
}
.items {
  list-style: none;
  margin: 0;
  padding: 0;
}
.section > .items > .item {
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
}
.section > .items > .item:last-child {
  border-bottom: 0;
}
/* Sub-items hang beneath their parent on a thin guide line. */
.item .items {
  margin: 6px 0 0 2px;
  padding-left: 14px;
  border-left: 1px solid var(--line);
}
.item .item {
  padding: 3px 0;
  font-size: 14px;
}
.title {
  overflow-wrap: anywhere;
}
.meta {
  font-size: 13px;
  color: var(--muted);
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
    padding-top: 24px;
  }
}
`;
