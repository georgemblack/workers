import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    ignorePatterns: ["worker-configuration.d.ts"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    importOrder: ["^(@/|[./])"],
    importOrderSeparation: true,
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: ["*.gen.ts", "pnpm-lock.yaml", "worker-configuration.d.ts"],
  },
  test: {
    passWithNoTests: true,
  },
});
