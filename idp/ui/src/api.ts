import {
  startAuthentication,
  startRegistration,
  type PublicKeyCredentialCreationOptionsJSON,
  type PublicKeyCredentialRequestOptionsJSON,
} from "@simplewebauthn/browser";

// Thin wrappers around the worker's JSON API. All of the real security checks
// happen on the server; these only send requests and surface errors.

export interface AuthState {
  authenticated: boolean;
  has_credential: boolean;
}

export interface Client {
  client_id: string;
  name: string;
  redirect_uris: string[];
  post_logout_redirect_uris: string[];
  token_endpoint_auth_method: string;
  email: string | null;
  created_at: string;
  has_secret: boolean;
}

interface NewClient {
  name: string;
  email: string;
  redirect_uris: string[];
  post_logout_redirect_uris: string[];
  token_endpoint_auth_method: string;
}

export interface CreatedClient {
  client_id: string;
  client_secret: string | null;
}

export interface Credential {
  credential_id: string;
  label: string | null;
  device_type: string;
  backed_up: boolean;
  created_at: string;
  last_used_at: string | null;
}

// Turns the API's error codes into something readable.
const ERROR_MESSAGES: Record<string, string> = {
  registration_closed:
    "Passkey registration is closed. Run `pnpm run registration:open` and try again.",
  unauthorized: "You're signed out. Sign in and try again.",
  bootstrap_required: "The bootstrap secret is missing or wrong.",
  no_credentials_registered: "No passkeys are registered yet.",
  cannot_delete_last_credential: "You can't delete your only passkey.",
  challenge_expired: "That took too long. Try again.",
  passkey_verification_failed: "That passkey couldn't be verified. Try again.",
  server_error: "Something went wrong. Try again.",
};

// An error from the API. `status` is the HTTP status, so callers can tell
// "signed out" (401) apart from other failures.
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const code = typeof body.error === "string" ? body.error : `HTTP ${response.status}`;
    throw new ApiError(ERROR_MESSAGES[code] ?? code, response.status);
  }
  return body as T;
}

function postJson<T>(url: string, data?: unknown, headers: Record<string, string> = {}) {
  return request<T>(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
}

export const getAuthState = () => request<AuthState>("/api/auth/state");

export const listClients = () =>
  request<{ clients: Client[]; default_email: string }>("/api/admin/clients");

export const createClient = (client: NewClient) =>
  postJson<CreatedClient>("/api/admin/clients", client);

export const deleteClient = (id: string) =>
  request(`/api/admin/clients/${encodeURIComponent(id)}`, { method: "DELETE" });

export const listCredentials = () => request<{ credentials: Credential[] }>("/api/credentials");

export const deleteCredential = (id: string) =>
  request(`/api/credentials/${encodeURIComponent(id)}`, { method: "DELETE" });

interface Challenge<T> {
  options: T;
  challengeId: string;
}

export async function signInWithPasskey() {
  const { options, challengeId } =
    await postJson<Challenge<PublicKeyCredentialRequestOptionsJSON>>("/api/auth/login/options");
  const response = await startAuthentication({ optionsJSON: options });
  await postJson("/api/auth/login/verify", { challengeId, response });
}

export async function registerPasskey({
  label,
  bootstrapSecret,
}: {
  label?: string;
  bootstrapSecret?: string;
}) {
  // Only needed before the first passkey exists. See the README.
  const headers: Record<string, string> = bootstrapSecret
    ? { "x-bootstrap-secret": bootstrapSecret }
    : {};
  const { options, challengeId } = await postJson<
    Challenge<PublicKeyCredentialCreationOptionsJSON>
  >("/api/auth/register/options", undefined, headers);
  const response = await startRegistration({ optionsJSON: options });
  await postJson("/api/auth/register/verify", { challengeId, label, response }, headers);
}

// Where to go after signing in. Only same-site paths are allowed, so a link
// can't use the login page to send you to another site. "//evil.com" and
// "/\evil.com" are rejected because browsers treat them as other sites.
export function safeNext(raw: string | null, fallback = "/admin"): string {
  return raw && /^\/[^/\\]/.test(raw) ? raw : fallback;
}
