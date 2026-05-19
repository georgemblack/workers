import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/server";
import {
  consumeWebauthnChallenge,
  getCredential,
  insertCredential,
  listCredentials,
  putWebauthnChallenge,
  updateCredentialCounter,
} from "./storage";
import { randomToken } from "./util";

interface WebauthnConfig {
  rpID: string;
  rpName: string;
  origin: string;
  userHandle: string;
  userName: string;
  userDisplayName: string;
}

export function configFromEnv(env: Cloudflare.Env): WebauthnConfig {
  return {
    rpID: env.RP_ID,
    rpName: env.RP_NAME,
    origin: env.ISSUER,
    userHandle: env.USER_HANDLE,
    userName: env.USER_NAME,
    userDisplayName: env.USER_DISPLAY_NAME,
  };
}

export async function startRegistration(env: Cloudflare.Env): Promise<{
  options: PublicKeyCredentialCreationOptionsJSON;
  challengeId: string;
}> {
  const cfg = configFromEnv(env);
  const existing = await listCredentials(env.DB);
  const options = await generateRegistrationOptions({
    rpName: cfg.rpName,
    rpID: cfg.rpID,
    userID: new TextEncoder().encode(cfg.userHandle) as Uint8Array<ArrayBuffer>,
    userName: cfg.userName,
    userDisplayName: cfg.userDisplayName,
    attestationType: "none",
    excludeCredentials: existing.map((c) => ({
      id: c.credential_id,
      transports: c.transports as AuthenticatorTransportFuture[],
    })),
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "required",
    },
  });

  const challengeId = randomToken(16);
  await putWebauthnChallenge(env.DB, `reg:${challengeId}`, options.challenge);
  return { options, challengeId };
}

export async function finishRegistration(
  env: Cloudflare.Env,
  challengeId: string,
  response: RegistrationResponseJSON,
  label: string | null,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const cfg = configFromEnv(env);
  const expectedChallenge = await consumeWebauthnChallenge(
    env.DB,
    `reg:${challengeId}`,
  );
  if (!expectedChallenge)
    return { ok: false, error: "Challenge not found or expired" };

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response,
      expectedChallenge,
      expectedOrigin: cfg.origin,
      expectedRPID: cfg.rpID,
      requireUserVerification: true,
    });
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  if (!verification.verified || !verification.registrationInfo) {
    return { ok: false, error: "Verification failed" };
  }

  const info = verification.registrationInfo;
  await insertCredential(env.DB, {
    credential_id: info.credential.id,
    public_key: info.credential.publicKey,
    counter: info.credential.counter,
    transports: (info.credential.transports as string[] | undefined) ?? [],
    device_type: info.credentialDeviceType,
    backed_up: info.credentialBackedUp,
    label,
  });

  return { ok: true };
}

export async function startAuthentication(env: Cloudflare.Env): Promise<{
  options: PublicKeyCredentialRequestOptionsJSON;
  challengeId: string;
}> {
  const cfg = configFromEnv(env);
  const credentials = await listCredentials(env.DB);
  const options = await generateAuthenticationOptions({
    rpID: cfg.rpID,
    userVerification: "required",
    allowCredentials: credentials.map((c) => ({
      id: c.credential_id,
      transports: c.transports as AuthenticatorTransportFuture[],
    })),
  });
  const challengeId = randomToken(16);
  await putWebauthnChallenge(env.DB, `auth:${challengeId}`, options.challenge);
  return { options, challengeId };
}

export async function finishAuthentication(
  env: Cloudflare.Env,
  challengeId: string,
  response: AuthenticationResponseJSON,
): Promise<{ ok: true; sub: string } | { ok: false; error: string }> {
  const cfg = configFromEnv(env);
  const expectedChallenge = await consumeWebauthnChallenge(
    env.DB,
    `auth:${challengeId}`,
  );
  if (!expectedChallenge)
    return { ok: false, error: "Challenge not found or expired" };

  const cred = await getCredential(env.DB, response.id);
  if (!cred) return { ok: false, error: "Unknown credential" };

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge,
      expectedOrigin: cfg.origin,
      expectedRPID: cfg.rpID,
      credential: {
        id: cred.credential_id,
        publicKey: cred.public_key as Uint8Array<ArrayBuffer>,
        counter: cred.counter,
        transports: cred.transports as AuthenticatorTransportFuture[],
      },
      requireUserVerification: true,
    });
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  if (!verification.verified)
    return { ok: false, error: "Verification failed" };

  await updateCredentialCounter(
    env.DB,
    cred.credential_id,
    verification.authenticationInfo.newCounter,
  );

  return { ok: true, sub: cfg.userHandle };
}

type AuthenticatorTransportFuture =
  | "ble"
  | "cable"
  | "hybrid"
  | "internal"
  | "nfc"
  | "smart-card"
  | "usb";
