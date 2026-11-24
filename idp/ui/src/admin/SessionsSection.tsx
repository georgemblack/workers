import { Button } from "@cloudflare/kumo";
import { SignOutIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { signOutEverywhere } from "../api";
import { ConfirmDialog } from "./ConfirmDialog";
import { SectionHeader, type Notify } from "./shared";

// Signs out every device at once, for when one is lost or stolen.
export function SessionsSection({ notify }: { notify: Notify }) {
  const [confirming, setConfirming] = useState(false);

  async function signOutAll() {
    try {
      await signOutEverywhere();
      // This device is signed out too.
      location.replace("/login?next=/admin");
    } catch (e) {
      notify("error", `Couldn't sign out everywhere: ${(e as Error).message}`);
    }
  }

  return (
    <section className="grid gap-4">
      <SectionHeader
        title="Sessions"
        description="End every sign-in, on every device, including this one."
        action={
          <Button
            size="sm"
            variant="secondary-destructive"
            icon={<SignOutIcon />}
            onClick={() => setConfirming(true)}
          >
            Sign out everywhere
          </Button>
        }
      />
      <ConfirmDialog
        open={confirming}
        title="Sign out everywhere?"
        description="Every device signed in to idp.george.black will be signed out, including this one, and apps will lose their refresh tokens. You'll need a passkey to sign in again."
        confirmLabel="Sign out everywhere"
        onConfirm={signOutAll}
        onClose={() => setConfirming(false)}
      />
    </section>
  );
}
