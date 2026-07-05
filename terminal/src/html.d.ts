// HTML files are bundled as text (see the "rules" in wrangler.jsonc), so
// importing one gives back its contents as a string.
declare module "*.html" {
  const content: string;
  export default content;
}
