// Helpers for WebAuthn — minimal base64url <-> ArrayBuffer plumbing and
// orchestration of the register / authenticate ceremonies.

export function b64urlToBytes(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
  s += "=".repeat(pad);
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function bytesToB64url(bytes) {
  let s = "";
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeRegistrationOptions(opts) {
  return {
    ...opts,
    challenge: b64urlToBytes(opts.challenge),
    user: { ...opts.user, id: b64urlToBytes(opts.user.id) },
    excludeCredentials: (opts.excludeCredentials || []).map((c) => ({
      ...c,
      id: b64urlToBytes(c.id),
    })),
  };
}

function decodeAuthenticationOptions(opts) {
  return {
    ...opts,
    challenge: b64urlToBytes(opts.challenge),
    allowCredentials: (opts.allowCredentials || []).map((c) => ({
      ...c,
      id: b64urlToBytes(c.id),
    })),
  };
}

function encodeRegistrationCredential(cred) {
  const r = cred.response;
  return {
    id: cred.id,
    rawId: bytesToB64url(cred.rawId),
    type: cred.type,
    authenticatorAttachment: cred.authenticatorAttachment,
    clientExtensionResults: cred.getClientExtensionResults(),
    response: {
      clientDataJSON: bytesToB64url(r.clientDataJSON),
      attestationObject: bytesToB64url(r.attestationObject),
      transports: r.getTransports ? r.getTransports() : [],
      publicKeyAlgorithm: r.getPublicKeyAlgorithm && r.getPublicKeyAlgorithm(),
      publicKey:
        r.getPublicKey && r.getPublicKey()
          ? bytesToB64url(r.getPublicKey())
          : undefined,
      authenticatorData:
        r.getAuthenticatorData && r.getAuthenticatorData()
          ? bytesToB64url(r.getAuthenticatorData())
          : undefined,
    },
  };
}

function encodeAuthenticationCredential(cred) {
  const r = cred.response;
  return {
    id: cred.id,
    rawId: bytesToB64url(cred.rawId),
    type: cred.type,
    authenticatorAttachment: cred.authenticatorAttachment,
    clientExtensionResults: cred.getClientExtensionResults(),
    response: {
      clientDataJSON: bytesToB64url(r.clientDataJSON),
      authenticatorData: bytesToB64url(r.authenticatorData),
      signature: bytesToB64url(r.signature),
      userHandle: r.userHandle ? bytesToB64url(r.userHandle) : undefined,
    },
  };
}

export async function register({ bootstrapSecret, label } = {}) {
  const headers = { "content-type": "application/json" };
  if (bootstrapSecret) headers["x-bootstrap-secret"] = bootstrapSecret;
  const optsResp = await fetch("/api/auth/register/options", {
    method: "POST",
    headers,
  });
  if (!optsResp.ok) {
    throw new Error((await optsResp.json()).error || "options_failed");
  }
  const { options, challengeId } = await optsResp.json();
  const credential = await navigator.credentials.create({
    publicKey: decodeRegistrationOptions(options),
  });
  if (!credential) throw new Error("registration_cancelled");

  const verifyResp = await fetch("/api/auth/register/verify", {
    method: "POST",
    headers,
    body: JSON.stringify({
      challengeId,
      label,
      response: encodeRegistrationCredential(credential),
    }),
  });
  if (!verifyResp.ok) {
    throw new Error((await verifyResp.json()).error || "verify_failed");
  }
  return await verifyResp.json();
}

export async function authenticate() {
  const optsResp = await fetch("/api/auth/login/options", { method: "POST" });
  if (!optsResp.ok) {
    throw new Error((await optsResp.json()).error || "options_failed");
  }
  const { options, challengeId } = await optsResp.json();
  const credential = await navigator.credentials.get({
    publicKey: decodeAuthenticationOptions(options),
  });
  if (!credential) throw new Error("login_cancelled");

  const verifyResp = await fetch("/api/auth/login/verify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      challengeId,
      response: encodeAuthenticationCredential(credential),
    }),
  });
  if (!verifyResp.ok) {
    throw new Error((await verifyResp.json()).error || "verify_failed");
  }
  return await verifyResp.json();
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}

export function showStatus(el, msg, kind) {
  el.textContent = msg;
  el.className = `status show ${kind}`;
}

export function clearStatus(el) {
  el.className = "status";
  el.textContent = "";
}
