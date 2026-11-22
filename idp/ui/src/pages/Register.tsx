import { Banner, Button, Input, Link, SensitiveInput, Text } from "@cloudflare/kumo";
import { useEffect, useState } from "react";
import { getAuthState, registerPasskey } from "../api";
import { AuthCard } from "../AuthCard";
import { mount } from "../mount";

function Register() {
  const [label, setLabel] = useState("");
  const [bootstrapSecret, setBootstrapSecret] = useState("");
  // The bootstrap secret is only asked for before any passkey exists.
  const [needsBootstrap, setNeedsBootstrap] = useState(false);
  const [canRegister, setCanRegister] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getAuthState()
      .then((state) => {
        if (!state.has_credential) setNeedsBootstrap(true);
        else if (!state.authenticated) {
          setCanRegister(false);
          setError("A passkey already exists. Sign in first to add another.");
        }
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  async function register() {
    setBusy(true);
    setError(null);
    try {
      await registerPasskey({
        label: label || undefined,
        bootstrapSecret: bootstrapSecret || undefined,
      });
      setDone(true);
      setTimeout(() => (location.href = "/admin"), 800);
    } catch (e) {
      setError(`Registration failed: ${(e as Error).message}`);
      setBusy(false);
    }
  }

  return (
    <AuthCard
      title="Register a passkey"
      description="Use a hardware key, password manager, or your device's biometrics."
    >
      {error && <Banner variant="error" description={error} />}
      {done && <Banner description="Passkey registered. Redirecting…" />}
      {needsBootstrap && (
        <SensitiveInput
          label="Bootstrap secret"
          value={bootstrapSecret}
          onChange={(e) => setBootstrapSecret(e.target.value)}
          autoComplete="off"
        />
      )}
      <Input
        label="Label"
        placeholder="e.g. MacBook Touch ID"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Button variant="primary" loading={busy} disabled={!canRegister || done} onClick={register}>
        Register passkey
      </Button>
      <Text variant="secondary" size="sm">
        <Link href="/login">Back to sign in</Link>
      </Text>
    </AuthCard>
  );
}

mount(<Register />);
