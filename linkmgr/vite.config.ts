import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  fmt: {
    ignorePatterns: ["worker-configuration.d.ts", "src/routeTree.gen.ts"],
  },
  lint: {
    ignorePatterns: ["worker-configuration.d.ts", "src/routeTree.gen.ts"],
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    passWithNoTests: true,
  },
  plugins: lazyPlugins(() => {
    if (process.env.VITEST) return [];

    return [
      devtools(),
      cloudflare({ viteEnvironment: { name: "ssr" } }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
    ];
  }),
});

export default config;
