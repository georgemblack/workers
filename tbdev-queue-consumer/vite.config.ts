import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: { ignorePatterns: ["worker-configuration.d.ts"] },
  lint: {
    ignorePatterns: ["worker-configuration.d.ts"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  test: { passWithNoTests: true },
});
