import { styles } from "./styles";
import { clientScript } from "./client";

export const page = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>govtrack</title>
<style>${styles}</style>
</head>
<body>
<header class="top"><a href="/" class="brand">govtrack</a></header>
<main>
<div id="error" role="alert"></div>
<div id="timeline-view">
<div id="filters" class="filters"></div>
<div id="profile"></div>
<div id="timeline"></div>
</div>
<div id="chat" hidden>
<a href="/">← Timeline</a>
<div id="messages"></div>
<button id="retry" hidden>Retry paused work</button>
<form id="compose" class="composer">
<textarea id="chat-text" aria-label="Message govtrack" placeholder="Message…" required maxlength="16000"></textarea>
<button type="submit">Send</button>
</form>
</div>
</main>
<a id="chat-button" class="chat-button" href="/chat">Chat</a>
<script>${clientScript}</script>
</body>
</html>`;
