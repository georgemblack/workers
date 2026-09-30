import { bindings, defineConfig } from "cf/config";

export default defineConfig({
  accountId: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
  worker: {
    name: "linkmgr",
    compatibilityDate: "2025-09-02",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint: "@tanstack/react-start/server-entry",
    workersDev: true,
    previewUrls: true,
    observability: {
      enabled: true,
    },
    env: {
      CF_ACCESS_TEAM_DOMAIN: bindings.text("https://georgeblack.cloudflareaccess.com"),
      CF_ACCESS_AUD: bindings.text(
        "ba12a44eede385f51d8985a99ba9163bce0f6b6f5db5f4d1e2817a16732255e8",
      ),
      DB: bindings.d1({
        name: "linkmgr",
        id: "11314889-4638-4543-a04e-2c5adf94c613",
      }),
      LINK_QUEUE: bindings.queue({
        name: "linkmgr-queue",
      }),
    },
  },
});
