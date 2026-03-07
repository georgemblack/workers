# Mailman Worker

Cloudflare Worker that checks a Fastmail mailbox hourly via JMAP, summarizes new emails with Workers AI, and sends push notifications via webhook.

## Testing the Live Worker

The worker has a fetch handler that accepts a `now` query parameter to simulate a cron trigger at a specific time. The worker looks for emails received within one hour before the given time.

### 1. Get a Cloudflare Access token

```sh
cloudflared access login https://mailman.georgeblack.workers.dev
```

This opens a browser for authentication and prints a token.

### 2. Trigger the worker

Pass the token as a header and provide a UTC timestamp via the `now` query parameter:

```sh
curl -s \
  -H "cf-access-token: <TOKEN>" \
  "https://mailman.georgeblack.workers.dev/?now=2026-03-06T22:00:00Z"
```

Omit `now` to use the current time (same as the cron trigger).

Add `&dry=true` to test without sending push notifications. This still queries Fastmail and runs AI summarization, but skips the webhook call:

```sh
curl -s \
  -H "cf-access-token: <TOKEN>" \
  "https://mailman.georgeblack.workers.dev/?now=2026-03-06T22:00:00Z&dry=true"
```
