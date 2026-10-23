import { createAI } from "agents/models/pi-ai";
import { compatibleAI } from "./ai.ts";

export function createBrainAI(binding: Ai, gateway: string) {
  return createAI({
    // Require the stored provider key rather than silently falling back to
    // Cloudflare-funded Unified Billing.
    binding: compatibleAI(binding, { "cf-aig-no-wholesale": "true" }),
    id: gateway,
    skipCache: true,
  });
}
