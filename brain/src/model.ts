import { createAI } from "agents/models/pi-ai";
import { compatibleAI } from "./ai.ts";

export function createBrainAI(binding: Ai, gateway: string) {
  return createAI({
    // No provider key is sent, so the gateway bills through Unified Billing
    // (or a BYOK key stored under its "default" alias, if one exists).
    binding: compatibleAI(binding),
    id: gateway,
    skipCache: true,
  });
}
