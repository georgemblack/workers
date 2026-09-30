import { defineWranglerConfig } from "wrangler/experimental-config";

export default defineWranglerConfig({
  // Bundle HTML templates as text so the preview route can import and render
  // them. They're imported as strings, not served as static assets.
  rules: [
    {
      type: "Text",
      globs: ["**/*.html"],
      fallthrough: true,
    },
  ],
  minify: true,
  uploadSourceMaps: true,
  types: {
    generate: false,
  },
});
