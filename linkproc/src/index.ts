interface QueueMessage {
  url: string;
  title?: string;
}

interface BrowserRenderingResponse {
  success: boolean;
  result: {
    title: string | null;
    description: string | null;
  };
}

function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const KEEP_QUERY_HOSTS = ["youtube.com", "www.youtube.com", "youtu.be"];

function sanitizeUrl(raw: string): string {
  const url = new URL(raw);
  url.hash = "";
  if (!KEEP_QUERY_HOSTS.includes(url.hostname)) {
    url.search = "";
  }
  return url.toString();
}

async function fetchMetadata(
  accountId: string,
  apiToken: string,
  url: string,
): Promise<{ title: string | null; description: string | null }> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/json`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url,
        response_format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              title: { type: "string", description: "The page title" },
              description: {
                type: "string",
                description: "The page description from meta tags",
              },
            },
          },
        },
      }),
    },
  );

  if (!response.ok) {
    console.error(`Browser Rendering API error for ${url}: ${response.status}`);
    return { title: null, description: null };
  }

  const data = (await response.json()) as BrowserRenderingResponse;
  if (!data.success) {
    console.error(`Browser Rendering API failed for ${url}`);
    return { title: null, description: null };
  }

  const title = data.result.title || null;
  const description = data.result.description || null;

  const junk = /not\s*found|^404$/i;
  return {
    title: title && junk.test(title) ? null : title,
    description: description && junk.test(description) ? null : description,
  };
}

export default {
  async queue(batch: MessageBatch, env: Env): Promise<void> {
    for (const message of batch.messages) {
      const { url: rawUrl, title: providedTitle } =
        message.body as QueueMessage;
      const url = sanitizeUrl(rawUrl);
      const { title: fetchedTitle, description } = await fetchMetadata(
        env.CF_ACCOUNT_ID,
        env.CF_API_TOKEN,
        url,
      );

      await env.DB.prepare(
        "INSERT INTO links (url, title, description) VALUES (?, ?, ?)",
      )
        .bind(
          url,
          providedTitle && !isUrl(providedTitle) ? providedTitle : fetchedTitle,
          description,
        )
        .run();

      message.ack();
    }
  },
} satisfies ExportedHandler<Env>;
