import { Button, Dialog } from "@cloudflare/kumo";
import { useState } from "react";
import { DialogActions, DialogHeader } from "./shared";

// A yes/no dialog for destructive actions like deleting a client or passkey.
// It stays open, with the button spinning, until `onConfirm` finishes.
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function confirm() {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
      onClose();
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog className="grid gap-4 px-6 py-5">
        <DialogHeader title={title} description={description} />
        <DialogActions>
          <Button variant="destructive" loading={busy} onClick={confirm}>
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog.Root>
  );
}
