import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  fmt: {
    ignorePatterns: [".cloudflare/**", "src/routeTree.gen.ts"],
  },
  lint: {
    ignorePatterns: [".cloudflare/**", "src/routeTree.gen.ts"],
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    passWithNoTests: true,
  },
  plugins: lazyPlugins(() => {
    if (process.env.VITEST) return [];

    return [
      cloudflare({
        viteEnvironment: { name: "ssr" },
        // Read cloudflare.config.ts and write build output for the cf CLI.
        experimental: { newConfig: { cfBuildOutput: true, types: { generate: false } } },
      }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
    ];
  }),
});

export default config;
