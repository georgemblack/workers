# AGENTS.md

This worker uses Hono, and serves a single webpage (at `/`), as well as a few API routes (prefixed with `/api`). The purpose of this webpage is to display how much sleep George (the creator) got the previous night.

Data is ingested via the `/api/samples` endpoint, and stored in a Durable Object (`HealthStore.ts`). When the webpage is requested, the Durable Object is queried, and the amount of sleep is calculated and displayed on the webpage.