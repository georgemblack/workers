import { bindings, defineConfig } from "cf/config";

export default defineConfig({
  accountId: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
  worker: {
    name: "terminal",
    compatibilityDate: "2026-05-03",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint: "src/index.ts",
    workersDev: true,
    previewUrls: true,
    observability: {
      enabled: true,
    },
    env: {
      DB: bindings.d1({
        name: "terminal",
        id: "bd7922ee-45a9-4b71-ae7c-b2255c2ce1c2",
      }),
    },
  },
});
