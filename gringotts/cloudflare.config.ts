import { bindings, defineConfig } from "cf/config";

export default defineConfig({
  accountId: "bc4564dd499c0a9b8a7bb79c9bd5ea6d",
  worker: {
    name: "gringotts",
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
        "c2ed398e3ec42165ed921659968bd8da5f64e544c1049a41832c96e3873d35f8",
      ),
      DB: bindings.d1({
        name: "gringotts",
        id: "7eb6e3a4-cad9-4fc9-b0e6-216555e33bbd",
        dev: {
          remote: true,
        },
      }),
      QUEUE: bindings.queue({
        name: "gringotts-queue",
      }),
    },
  },
});
