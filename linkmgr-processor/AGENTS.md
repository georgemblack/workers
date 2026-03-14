# Link Manager Processor

Cloudflare Worker queue consumer that processes links submitted to the Link Manager.

## How It Works

1. Receives URLs from the `linkmgr-queue` queue
2. Sanitizes the URL (removes query params and hash)
3. Uses Cloudflare Browser Rendering (puppeteer) to load the page
4. Extracts title and description from OpenGraph and meta tags
5. Inserts the link into the D1 database
