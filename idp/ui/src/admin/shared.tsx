import { Button, Dialog, Text } from "@cloudflare/kumo";
import type { ReactNode } from "react";

// Shared building blocks for the admin page.

// Shows a message in the banner at the top of the admin page.
export type Notify = (kind: "error" | "success", message: string) => void;

// A section title with a one-line description and an action button.
export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="grid gap-1">
        <Text variant="heading" as="h2">
          {title}
        </Text>
        <Text variant="secondary">{description}</Text>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

// The title and subtitle on each row of a list.
export function RowText({ title, subtitle }: { title: ReactNode; subtitle: ReactNode }) {
  return (
    <span className="grid min-w-0 flex-1 gap-0.5">
      <span className="flex min-w-0 items-center gap-2">{title}</span>
      <Text variant="secondary" size="sm" truncate>
        {subtitle}
      </Text>
    </span>
  );
}

// A label and its value. Stacked on phones, side by side on wider screens.
export function LabeledValue({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[12rem_1fr] sm:gap-4">
      <Text variant="secondary" as="dt">
        {label}
      </Text>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

// The title and optional description at the top of a dialog.
export function DialogHeader({ title, description }: { title: string; description?: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Dialog.Title className="text-base font-semibold">{title}</Dialog.Title>
      {description && (
        <Dialog.Description className="text-kumo-subtle">{description}</Dialog.Description>
      )}
    </div>
  );
}

// A dialog's Cancel button plus its main action.
export function DialogActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end gap-2">
      <Dialog.Close render={(props) => <Button {...props}>Cancel</Button>} />
      {children}
    </div>
  );
}

// Dates from the database are UTC, like "2026-11-22 21:47:03".
export function formatDate(value: string | null): string {
  if (!value) return "Never";
  const date = new Date(`${value.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
