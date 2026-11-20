import { bindings, defineConfig, exports } from "cf/config";

export default defineConfig({
  accountId: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
  worker: {
    name: "brain2",
    entrypoint: "src/index.ts",
    compatibilityDate: "2026-10-23",
    compatibilityFlags: ["nodejs_compat"],
    workersDev: true,
    previewUrls: false,
    observability: { enabled: true },
    exports: { Brain2: exports.durableObject({ storage: "sqlite" }) },
    env: {
      BRAIN: bindings.durableObject({ worker: "brain2", exportName: "Brain2" }),
      AI: bindings.ai(),
      MODEL: bindings.text("openai/gpt-6-luna"),
      AI_GATEWAY: bindings.text("main"),
      TIMEZONE: bindings.text("America/Chicago"),
      // Shares brain's Access app, which also protects this Worker.
      ACCESS_AUD: bindings.text(
        "07824b62bf6eb9bf2879f3dcb5832c812103e98466c0e9fabb44e22d55c65cb0",
      ),
    },
  },
});
