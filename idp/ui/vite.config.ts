import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

// Builds the browser UI (one HTML page per route) into dist/client, which the
// worker serves as static files. See `assetsDirectory` in wrangler.config.ts.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "index.html",
        login: "login.html",
        register: "register.html",
        admin: "admin.html",
        signout: "signout.html",
      },
    },
  },
});
