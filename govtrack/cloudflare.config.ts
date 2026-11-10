import { bindings, defineConfig, exports } from "cf/config";

export default defineConfig({
  accountId: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
  worker: {
    name: "govtrack",
    entrypoint: "src/index.ts",
    compatibilityDate: "2026-10-23",
    compatibilityFlags: ["nodejs_compat"],
    workersDev: true,
    previewUrls: false,
    observability: { enabled: true },
    exports: { GovTrack: exports.durableObject({ storage: "sqlite" }) },
    env: {
      GOVTRACK: bindings.durableObject({
        worker: "govtrack",
        exportName: "GovTrack",
      }),
      AI: bindings.ai(),
      // Lets the agent read the articles and pages you link to.
      BROWSER: bindings.browser(),
      MODEL: bindings.text("openai/gpt-6-luna"),
      AI_GATEWAY: bindings.text("govtrack"),
      TIMEZONE: bindings.text("America/Chicago"),
      // Audience of the GovTrack Access app. Requests fail closed (503) until set.
      ACCESS_AUD: bindings.text(""),
    },
  },
});
