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
select:focus-visible,
summary:focus-visible {
  outline: 2px solid var(--muted);
  outline-offset: 3px;
}
.chat-button {
  position: fixed;
  right: 24px;
  bottom: 24px;
  font-size: 13px;
}
h2 {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  margin: 32px 0 8px;
}
.section:first-child h2 {
  margin-top: 0;
}
.focus {
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-left: 3px solid #9b8157;
  border-radius: 8px;
  margin-bottom: 28px;
}
.focus h2,
.area h2 {
  color: var(--text);
  font-size: 15px;
  margin: 0;
}
.focus-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}
.focus .item {
  padding: 0;
  border: 0;
}
.focus-item:last-child,
.area .item:last-child {
  border-bottom: 0;
}
.focus-reason,
.area-summary {
  color: var(--muted);
  font-size: 13px;
  margin: 4px 0 12px;
}
.focus-reason {
  margin: 4px 0 0;
}
.area {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 18px 20px;
  margin: 16px 0;
}
.area-heading {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}
.area-count {
  font-size: 12px;
  color: var(--muted);
  text-align: right;
}
.fold {
  margin: 12px 0 0;
  font-size: inherit;
  color: inherit;
}
.fold > summary {
  font-size: 13px;
  color: var(--muted);
}
.fold .item {
  margin-left: 4px;
}
@media (max-width: 480px) {
  .area,
  .focus {
    padding: 14px;
  }
}
.item {
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}
.item-line {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.meta,
.why {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--muted);
}
summary {
  cursor: pointer;
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
