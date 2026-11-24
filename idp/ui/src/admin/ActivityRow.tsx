import { Collapsible, InlineCopyText, Text } from "@cloudflare/kumo";
import { CaretDownIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import type { ActivityEntry, ActivityEvent } from "../api";
import { LabeledValue, RowText, formatDateTime } from "./shared";

// What each kind of event is called in the filter on the activity page.
export const EVENT_NAMES: Record<ActivityEvent["event"], string> = {
  sign_in: "Passkey sign-ins",
  app_sign_in: "App sign-ins",
  sign_out: "Sign-outs",
  sign_out_everywhere: "Sign out everywhere",
  passkey_added: "Passkeys added",
  passkey_deleted: "Passkeys deleted",
  client_created: "Clients created",
  client_deleted: "Clients deleted",
};

// One activity log entry. The row says what happened, when and roughly where;
// clicking it opens everything else that was recorded.
export function ActivityRow({ entry }: { entry: ActivityEntry }) {
  const where = place(entry);
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-kumo-tint data-[panel-open]:bg-kumo-tint">
        <RowText
          title={
            <Text bold truncate>
              {summary(entry)}
            </Text>
          }
          subtitle={[formatDateTime(entry.created_at), where, entry.as_org]
            .filter(Boolean)
            .join(" · ")}
        />
        <CaretDownIcon
          size={14}
          weight="bold"
          className="shrink-0 text-kumo-subtle [[data-panel-open]_&]:rotate-180"
        />
      </Collapsible.Trigger>
      <Collapsible.Panel className="border-t border-kumo-line bg-kumo-elevated px-4 py-4">
        <dl className="grid gap-3">
          <LabeledValue label="Time">
            {formatDateTime(entry.created_at, { withSeconds: true })}
          </LabeledValue>
          {details(entry).map(([label, value]) => (
            <LabeledValue key={label} label={label}>
              {value}
            </LabeledValue>
          ))}
          <LabeledValue label="IP address">
            {entry.ip ? <Copyable label="IP address">{entry.ip}</Copyable> : <Unknown />}
          </LabeledValue>
          <LabeledValue label="Location">{where ?? <Unknown />}</LabeledValue>
          <LabeledValue label="Network">{network(entry) ?? <Unknown />}</LabeledValue>
          <LabeledValue label="Browser">
            {entry.user_agent ? (
              <span className="break-all">
                <Text variant="mono">{entry.user_agent}</Text>
              </span>
            ) : (
              <Unknown />
            )}
          </LabeledValue>
          <LabeledValue label="Ray ID">
            {entry.ray_id ? <Copyable label="Ray ID">{entry.ray_id}</Copyable> : <Unknown />}
          </LabeledValue>
        </dl>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

function passkeyName(label: string | null): string {
  return label || "Unlabeled passkey";
}

// For use mid-sentence, e.g. "Signed in with an unlabeled passkey".
function passkeyInSentence(label: string | null): string {
  return label || "an unlabeled passkey";
}

// A one-line description of what happened.
function summary(entry: ActivityEvent): string {
  switch (entry.event) {
    case "sign_in":
      return `Signed in with ${passkeyInSentence(entry.details.passkey)}`;
    case "app_sign_in":
      return `Signed in to ${entry.details.client_name ?? entry.details.client_id}`;
    case "sign_out":
      return "Signed out";
    case "sign_out_everywhere":
      return entry.details.reason === "passkey_deleted"
        ? "Signed out everywhere (passkey deleted)"
        : "Signed out everywhere";
    case "passkey_added":
      return `Added ${passkeyInSentence(entry.details.passkey)}`;
    case "passkey_deleted":
      return `Deleted ${passkeyInSentence(entry.details.passkey)}`;
    case "client_created":
      return `Created client ${entry.details.name}`;
    case "client_deleted":
      return `Deleted client ${entry.details.name}`;
  }
}

// The details that only some kinds of events have, as label and value pairs.
function details(entry: ActivityEvent): [string, ReactNode][] {
  switch (entry.event) {
    case "sign_in":
    case "passkey_added":
    case "passkey_deleted":
      return [
        ["Passkey", passkeyName(entry.details.passkey)],
        ["Passkey ID", <Text variant="mono">{entry.details.credential_id}</Text>],
      ];
    case "app_sign_in":
      return [
        ["App", entry.details.client_name ?? "Deleted client"],
        ["Client ID", <Text variant="mono">{entry.details.client_id}</Text>],
        ["Scopes", <Text variant="mono">{entry.details.scope}</Text>],
      ];
    case "sign_out":
      return entry.details.client_id
        ? [["From app", <Text variant="mono">{entry.details.client_id}</Text>]]
        : [];
    case "sign_out_everywhere":
      return [
        [
          "Reason",
          entry.details.reason === "passkey_deleted"
            ? "A passkey was deleted"
            : "Sign out everywhere button",
        ],
      ];
    case "client_created":
    case "client_deleted":
      return [
        ["Client", entry.details.name],
        ["Client ID", <Text variant="mono">{entry.details.client_id}</Text>],
      ];
  }
}

// e.g. "Toronto, Ontario, CA". Null when Cloudflare didn't know.
function place(entry: ActivityEntry): string | null {
  return [entry.city, entry.region, entry.country].filter(Boolean).join(", ") || null;
}

// e.g. "Rogers (AS812)": who runs the network the request came from.
function network(entry: ActivityEntry): string | null {
  if (entry.as_org && entry.asn) return `${entry.as_org} (AS${entry.asn})`;
  if (entry.asn) return `AS${entry.asn}`;
  return entry.as_org;
}

function Copyable({ label, children }: { label: string; children: string }) {
  return (
    <InlineCopyText labels={{ copyAction: `Copy ${label}`, copied: `${label} copied` }}>
      {children}
    </InlineCopyText>
  );
}

function Unknown() {
  return <Text variant="secondary">Unknown</Text>;
}
