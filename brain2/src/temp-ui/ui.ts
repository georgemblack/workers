// Temporary chat-only page, ported from brain. Plan 06 replaces this folder.
import { styles } from "./styles";
import { clientScript } from "./client";

export const page = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>brain2</title>
<style>${styles}</style>
</head>
<body>
<main>
<div id="error" role="alert"></div>
<div id="chat">
<div id="messages"></div>
<button id="retry" data-action="retry" hidden>Retry paused work</button>
<form id="compose" class="composer">
<textarea id="chat-text" aria-label="Message brain2" placeholder="Message…" required maxlength="16000"></textarea>
<button type="submit">Send</button>
</form>
</div>
</main>
<script>${clientScript}</script>
</body>
</html>`;
