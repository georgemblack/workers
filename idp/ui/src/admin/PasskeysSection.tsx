import { Badge, Button, Dialog, Input, LayerCard, Table, Text } from "@cloudflare/kumo";
import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { deleteCredential, registerPasskey, type Credential } from "../api";
import { ConfirmDialog } from "./ConfirmDialog";

// The passkeys table, plus adding and deleting passkeys. Adding one only works
// while registration is open (see the README).
export function PasskeysSection({
  credentials,
  onChange,
  onError,
  onSuccess,
}: {
  credentials: Credential[];
  onChange: () => void;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState<Credential | null>(null);

  async function add() {
    setBusy(true);
    try {
      await registerPasskey({ label: label.trim() || undefined });
      setAdding(false);
      setLabel("");
      onSuccess("Passkey added.");
      onChange();
    } catch (e) {
      setAdding(false);
      onError(`Couldn't add the passkey: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleting) return;
    const id = deleting.credential_id;
    setDeleting(null);
    try {
      await deleteCredential(id);
      onChange();
    } catch (e) {
      onError(`Couldn't delete the passkey: ${(e as Error).message}`);
    }
  }

  return (
    <section className="grid gap-3">
      <div className="flex items-center justify-between gap-4">
        <Text variant="heading" as="h2">
          Passkeys
        </Text>
        <Button size="sm" icon={<PlusIcon />} onClick={() => setAdding(true)}>
          Add passkey
        </Button>
      </div>

      <LayerCard className="overflow-hidden p-0">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Label</Table.Head>
              <Table.Head className="hidden sm:table-cell">Created</Table.Head>
              <Table.Head>Last used</Table.Head>
              <Table.Head />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {credentials.map((cred) => (
              <Table.Row key={cred.credential_id}>
                <Table.Cell>
                  <div className="flex flex-wrap items-center gap-2">
                    {cred.label || <Text variant="secondary">Unlabeled</Text>}
                    {cred.backed_up && <Badge variant="secondary">Synced</Badge>}
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden sm:table-cell">{cred.created_at}</Table.Cell>
                <Table.Cell>{cred.last_used_at ?? "Never"}</Table.Cell>
                <Table.Cell className="text-right">
                  <Button
                    size="sm"
                    variant="secondary-destructive"
                    onClick={() => setDeleting(cred)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </LayerCard>

      <Dialog.Root open={adding} onOpenChange={(next) => !next && setAdding(false)}>
        <Dialog className="grid gap-4 px-6 py-5">
          <div className="grid gap-1.5">
            <Dialog.Title className="text-base font-semibold">Add passkey</Dialog.Title>
            <Dialog.Description className="text-kumo-subtle">
              Registration must be open first: run `pnpm run registration:open`.
            </Dialog.Description>
          </div>
          <Input
            label="Label"
            placeholder="e.g. YubiKey 5C"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button variant="primary" loading={busy} onClick={add}>
              Add passkey
            </Button>
          </div>
        </Dialog>
      </Dialog.Root>
      <ConfirmDialog
        open={deleting !== null}
        title="Delete passkey?"
        description={`${deleting?.label || "This passkey"} won't be able to sign in anymore. This can't be undone.`}
        confirmLabel="Delete passkey"
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
    </section>
  );
}
