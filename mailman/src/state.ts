// Everything the worker remembers between runs lives in the STATE KV namespace, separated by key prefix:
//   seen:<emailId>   emails left in the inbox, so they aren't processed again
//   open:<token>     the email a notification's link should move back to the inbox
//   cache:config     Fastmail account and mailbox IDs, which rarely change

const DAY_SECONDS = 24 * 60 * 60;
const SEEN_TTL_SECONDS = 60 * DAY_SECONDS;
const OPEN_TTL_SECONDS = DAY_SECONDS;
const CONFIG_TTL_SECONDS = 7 * DAY_SECONDS;

// KV can read at most this many keys in one call.
const BULK_GET_LIMIT = 100;

const seenKey = (emailId: string) => `seen:${emailId}`;
const openKey = (token: string) => `open:${token}`;
const CONFIG_KEY = "cache:config";

// Returns the IDs from the list that were already processed on an earlier run.
export async function getSeen(env: CloudflareBindings, emailIds: string[]): Promise<Set<string>> {
  const seen = new Set<string>();
  for (let i = 0; i < emailIds.length; i += BULK_GET_LIMIT) {
    const batch = emailIds.slice(i, i + BULK_GET_LIMIT);
    const values = await env.STATE.get(batch.map(seenKey), "text");
    for (const id of batch) {
      if (values.get(seenKey(id)) !== null) seen.add(id);
    }
  }
  return seen;
}

export async function markSeen(env: CloudflareBindings, emailId: string): Promise<void> {
  await env.STATE.put(seenKey(emailId), "1", { expirationTtl: SEEN_TTL_SECONDS });
}

// Creates a short-lived token that points at an email, for use in a notification link.
export async function createOpenToken(env: CloudflareBindings, emailId: string): Promise<string> {
  const token = crypto.randomUUID();
  await env.STATE.put(openKey(token), emailId, { expirationTtl: OPEN_TTL_SECONDS });
  return token;
}

export async function getOpenToken(env: CloudflareBindings, token: string): Promise<string | null> {
  return env.STATE.get(openKey(token));
}

export async function deleteOpenToken(env: CloudflareBindings, token: string): Promise<void> {
  await env.STATE.delete(openKey(token));
}

export async function getCachedConfig<T>(env: CloudflareBindings): Promise<T | null> {
  return env.STATE.get<T>(CONFIG_KEY, "json");
}

export async function setCachedConfig(env: CloudflareBindings, config: unknown): Promise<void> {
  await env.STATE.put(CONFIG_KEY, JSON.stringify(config), { expirationTtl: CONFIG_TTL_SECONDS });
}

export async function clearCachedConfig(env: CloudflareBindings): Promise<void> {
  await env.STATE.delete(CONFIG_KEY);
}
