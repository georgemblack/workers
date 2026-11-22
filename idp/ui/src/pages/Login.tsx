import { Banner, Button, Link, Text } from "@cloudflare/kumo";
import { FingerprintIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getAuthState, safeNext, signInWithPasskey } from "../api";
import { AuthCard } from "../AuthCard";
import { mount } from "../mount";

const next = safeNext(new URLSearchParams(location.search).get("next"));

function Login() {
  const [busy, setBusy] = useState(false);
  const [canSignIn, setCanSignIn] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAuthState()
      .then((state) => {
        if (state.authenticated) location.replace(next);
        else if (!state.has_credential) {
          setCanSignIn(false);
          setError("No passkeys are registered yet. Register one first.");
        }
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  async function signIn() {
    setBusy(true);
    setError(null);
    try {
      await signInWithPasskey();
      location.replace(next);
    } catch (e) {
      setError(`Sign-in failed: ${(e as Error).message}`);
      setBusy(false);
    }
  }

  return (
    <AuthCard title="Sign in" description="Use your passkey to continue.">
      {error && <Banner variant="error" description={error} />}
      <Button
        variant="primary"
        icon={<FingerprintIcon />}
        loading={busy}
        disabled={!canSignIn}
        onClick={signIn}
      >
        Sign in with passkey
      </Button>
      <Text variant="secondary" size="sm">
        No passkey yet? <Link href="/register">Register one</Link>.
      </Text>
    </AuthCard>
  );
}

mount(<Login />);
