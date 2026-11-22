import { Badge, Button, Dialog, Input, LayerCard, Text } from "@cloudflare/kumo";
import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { deleteCredential, registerPasskey, type Credential } from "../api";
import { ConfirmDialog } from "./ConfirmDialog";
import {
  DialogActions,
  DialogHeader,
  RowText,
  SectionHeader,
  formatDate,
  type Notify,
} from "./shared";

// The list of passkeys, plus adding and deleting them. Adding one only works
// while registration is open (see the README).
export function PasskeysSection({
  credentials,
  onChange,
  notify,
}: {
  credentials: Credential[];
  onChange: () => void;
  notify: Notify;
}) {
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState<Credential | null>(null);

  async function add() {
    setBusy(true);
    try {
      await registerPasskey({ label: label.trim() || undefined });
      setLabel("");
      notify("success", "Passkey added.");
      onChange();
    } catch (e) {
      notify("error", `Couldn't add the passkey: ${(e as Error).message}`);
    } finally {
      setAdding(false);
      setBusy(false);
    }
  }

  async function remove(cred: Credential) {
    try {
      await deleteCredential(cred.credential_id);
      onChange();
    } catch (e) {
      notify("error", `Couldn't delete the passkey: ${(e as Error).message}`);
    }
  }

  return (
    <section className="grid gap-4">
      <SectionHeader
        title="Passkeys"
        description="Devices and security keys that can sign in."
        action={
          <Button size="sm" icon={<PlusIcon />} onClick={() => setAdding(true)}>
            Add passkey
          </Button>
        }
      />

      <LayerCard className="divide-y divide-kumo-line overflow-hidden p-0">
        {credentials.map((cred) => (
          <div key={cred.credential_id} className="flex items-center gap-4 px-4 py-3">
            <RowText
              title={
                <>
                  <Text bold truncate>
                    {cred.label || "Unlabeled passkey"}
                  </Text>
                  {cred.backed_up && <Badge variant="secondary">Synced</Badge>}
                </>
              }
              subtitle={`Added ${formatDate(cred.created_at)} · Last used ${formatDate(cred.last_used_at)}`}
            />
            <Button size="sm" variant="secondary-destructive" onClick={() => setDeleting(cred)}>
              Delete
            </Button>
          </div>
        ))}
      </LayerCard>

      <Dialog.Root open={adding} onOpenChange={setAdding}>
        <Dialog className="grid gap-4 px-6 py-5">
          <DialogHeader
            title="Add passkey"
            description={
              <>
                Registration must be open first. Run{" "}
                <Text variant="mono">pnpm run registration:open</Text>.
              </>
            }
          />
          <Input
            label="Label"
            placeholder="e.g. YubiKey 5C"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <DialogActions>
            <Button variant="primary" loading={busy} onClick={add}>
              Add passkey
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog.Root>
      <ConfirmDialog
        open={deleting !== null}
        title="Delete passkey?"
        description={`${deleting?.label || "This passkey"} won't be able to sign in anymore. This can't be undone.`}
        confirmLabel="Delete passkey"
        onConfirm={() => remove(deleting!)}
        onClose={() => setDeleting(null)}
      />
    </section>
  );
}
