import { Button, Text } from "@cloudflare/kumo";
import { FingerprintIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getAuthState, safeNext, signInWithPasskey } from "../api";
import { mount } from "../mount";

const next = safeNext(new URLSearchParams(location.search).get("next"));

// Just the sign-in button in the middle of the page. A short message appears
// under it only when something goes wrong.
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
          setError("No passkeys are registered yet.");
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
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <Button
        variant="primary"
        icon={<FingerprintIcon />}
        loading={busy}
        disabled={!canSignIn}
        onClick={signIn}
      >
        Sign in with passkey
      </Button>
      {error && (
        // Positioned below the button so it doesn't shift the button around.
        <div className="absolute inset-x-4 top-1/2 mt-8 text-center" role="alert">
          <Text variant="error" size="sm">
            {error}
          </Text>
        </div>
      )}
    </main>
  );
}

mount(<Login />);
