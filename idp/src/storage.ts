import { base64urlEncode, sha256 } from "./util";

export interface Client {
  client_id: string;
  client_secret_hash: string | null;
  name: string;
  redirect_uris: string[];
  post_logout_redirect_uris: string[];
  token_endpoint_auth_method:
    | "client_secret_basic"
    | "client_secret_post"
    | "none";
  created_at: string;
}

interface ClientRow {
  client_id: string;
  client_secret_hash: string | null;
  name: string;
  redirect_uris: string;
  post_logout_redirect_uris: string;
  token_endpoint_auth_method: string;
  created_at: string;
}

function rowToClient(row: ClientRow): Client {
  return {
    client_id: row.client_id,
    client_secret_hash: row.client_secret_hash,
    name: row.name,
    redirect_uris: JSON.parse(row.redirect_uris),
    post_logout_redirect_uris: JSON.parse(row.post_logout_redirect_uris),
    token_endpoint_auth_method:
      row.token_endpoint_auth_method as Client["token_endpoint_auth_method"],
    created_at: row.created_at,
  };
}

export async function getClient(
  db: D1Database,
  clientId: string,
): Promise<Client | null> {
  const row = await db
    .prepare("SELECT * FROM clients WHERE client_id = ?")
    .bind(clientId)
    .first<ClientRow>();
  return row ? rowToClient(row) : null;
}

export async function listClients(db: D1Database): Promise<Client[]> {
  const { results } = await db
    .prepare("SELECT * FROM clients ORDER BY created_at DESC")
    .all<ClientRow>();
  return results.map(rowToClient);
}

export async function createClient(
  db: D1Database,
  input: {
    client_id: string;
    client_secret_hash: string | null;
    name: string;
    redirect_uris: string[];
    post_logout_redirect_uris: string[];
    token_endpoint_auth_method: Client["token_endpoint_auth_method"];
  },
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO clients (client_id, client_secret_hash, name, redirect_uris, post_logout_redirect_uris, token_endpoint_auth_method)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      input.client_id,
      input.client_secret_hash,
      input.name,
      JSON.stringify(input.redirect_uris),
      JSON.stringify(input.post_logout_redirect_uris),
      input.token_endpoint_auth_method,
    )
    .run();
}

export async function deleteClient(
  db: D1Database,
  clientId: string,
): Promise<void> {
  await db
    .prepare("DELETE FROM clients WHERE client_id = ?")
    .bind(clientId)
    .run();
}

export async function hashSecret(secret: string): Promise<string> {
  return base64urlEncode(await sha256(secret));
}

export interface CredentialRecord {
  credential_id: string;
  public_key: Uint8Array;
  counter: number;
  transports: string[];
  device_type: string;
  backed_up: boolean;
  label: string | null;
  created_at: string;
  last_used_at: string | null;
}

interface CredentialRow {
  credential_id: string;
  public_key: ArrayBuffer | Uint8Array;
  counter: number;
  transports: string;
  device_type: string;
  backed_up: number;
  label: string | null;
  created_at: string;
  last_used_at: string | null;
}

function rowToCredential(row: CredentialRow): CredentialRecord {
  const pk =
    row.public_key instanceof Uint8Array
      ? row.public_key
      : new Uint8Array(row.public_key);
  return {
    credential_id: row.credential_id,
    public_key: pk,
    counter: row.counter,
    transports: JSON.parse(row.transports),
    device_type: row.device_type,
    backed_up: row.backed_up === 1,
    label: row.label,
    created_at: row.created_at,
    last_used_at: row.last_used_at,
  };
}

export async function listCredentials(
  db: D1Database,
): Promise<CredentialRecord[]> {
  const { results } = await db
    .prepare("SELECT * FROM credentials ORDER BY created_at DESC")
    .all<CredentialRow>();
  return results.map(rowToCredential);
}

export async function getCredential(
  db: D1Database,
  credentialId: string,
): Promise<CredentialRecord | null> {
  const row = await db
    .prepare("SELECT * FROM credentials WHERE credential_id = ?")
    .bind(credentialId)
    .first<CredentialRow>();
  return row ? rowToCredential(row) : null;
}

export async function countCredentials(db: D1Database): Promise<number> {
  const row = await db
    .prepare("SELECT COUNT(*) AS c FROM credentials")
    .first<{ c: number }>();
  return row?.c ?? 0;
}

export async function insertCredential(
  db: D1Database,
  input: Omit<CredentialRecord, "created_at" | "last_used_at">,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO credentials (credential_id, public_key, counter, transports, device_type, backed_up, label)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      input.credential_id,
      input.public_key,
      input.counter,
      JSON.stringify(input.transports),
      input.device_type,
      input.backed_up ? 1 : 0,
      input.label,
    )
    .run();
}

export async function updateCredentialCounter(
  db: D1Database,
  credentialId: string,
  counter: number,
): Promise<void> {
  await db
    .prepare(
      "UPDATE credentials SET counter = ?, last_used_at = datetime('now') WHERE credential_id = ?",
    )
    .bind(counter, credentialId)
    .run();
}

export async function deleteCredential(
  db: D1Database,
  credentialId: string,
): Promise<void> {
  await db
    .prepare("DELETE FROM credentials WHERE credential_id = ?")
    .bind(credentialId)
    .run();
}

export interface AuthCodeRecord {
  client_id: string;
  redirect_uri: string;
  scope: string;
  nonce?: string;
  code_challenge: string;
  code_challenge_method: "S256";
  sub: string;
  auth_time: number;
}

export async function putAuthCode(
  db: D1Database,
  code: string,
  data: AuthCodeRecord,
  ttl: number,
): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + ttl;
  await db
    .prepare(
      "INSERT INTO auth_codes (code, payload, expires_at) VALUES (?, ?, ?)",
    )
    .bind(code, JSON.stringify(data), expiresAt)
    .run();
}

export async function consumeAuthCode(
  db: D1Database,
  code: string,
): Promise<AuthCodeRecord | null> {
  const now = Math.floor(Date.now() / 1000);
  const row = await db
    .prepare(
      "DELETE FROM auth_codes WHERE code = ? AND expires_at > ? RETURNING payload",
    )
    .bind(code, now)
    .first<{ payload: string }>();
  if (!row) return null;
  return JSON.parse(row.payload) as AuthCodeRecord;
}

export interface RefreshTokenRecord {
  client_id: string;
  scope: string;
  sub: string;
  auth_time: number;
  nonce?: string;
}

export async function putRefreshToken(
  db: D1Database,
  token: string,
  data: RefreshTokenRecord,
  ttl: number,
): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + ttl;
  await db
    .prepare(
      "INSERT INTO refresh_tokens (token, payload, expires_at) VALUES (?, ?, ?)",
    )
    .bind(token, JSON.stringify(data), expiresAt)
    .run();
}

export async function consumeRefreshToken(
  db: D1Database,
  token: string,
): Promise<RefreshTokenRecord | null> {
  const now = Math.floor(Date.now() / 1000);
  const row = await db
    .prepare(
      "DELETE FROM refresh_tokens WHERE token = ? AND expires_at > ? RETURNING payload",
    )
    .bind(token, now)
    .first<{ payload: string }>();
  if (!row) return null;
  return JSON.parse(row.payload) as RefreshTokenRecord;
}

export async function putWebauthnChallenge(
  db: D1Database,
  id: string,
  challenge: string,
  ttl = 300,
): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + ttl;
  await db
    .prepare(
      "INSERT INTO webauthn_challenges (id, challenge, expires_at) VALUES (?, ?, ?)",
    )
    .bind(id, challenge, expiresAt)
    .run();
}

export async function consumeWebauthnChallenge(
  db: D1Database,
  id: string,
): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  const row = await db
    .prepare(
      "DELETE FROM webauthn_challenges WHERE id = ? AND expires_at > ? RETURNING challenge",
    )
    .bind(id, now)
    .first<{ challenge: string }>();
  return row?.challenge ?? null;
}
