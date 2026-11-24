import { Button, Collapsible, Empty, InlineCopyText, LayerCard, Text } from "@cloudflare/kumo";
import { CaretDownIcon, PlugsConnectedIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { deleteClient, type Client } from "../api";
import { ConfirmDialog } from "./ConfirmDialog";
import { NewClientDialog } from "./NewClientDialog";
import { LabeledValue, RowText, SectionHeader, formatDate, type Notify } from "./shared";

// The list of OIDC clients. Each row shows the basics; clicking it opens the
// rest of the client's details, including Delete.
export function ClientsSection({
  clients,
  defaultEmail,
  onChange,
  notify,
}: {
  clients: Client[];
  defaultEmail: string;
  onChange: () => void;
  notify: Notify;
}) {
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Client | null>(null);

  async function remove(client: Client) {
    try {
      await deleteClient(client.client_id);
      onChange();
    } catch (e) {
      notify("error", `Couldn't delete the client: ${(e as Error).message}`);
    }
  }

  return (
    <section className="grid gap-4">
      <SectionHeader
        title="OIDC clients"
        description="Apps that sign in through this idp."
        action={
          <Button size="sm" icon={<PlusIcon />} onClick={() => setCreating(true)}>
            New client
          </Button>
        }
      />

      {/* Empty is a box of its own, so it replaces the card rather than going inside it. */}
      {clients.length === 0 ? (
        <Empty
          size="sm"
          icon={<PlugsConnectedIcon size={32} className="text-kumo-inactive" />}
          title="No clients yet"
          description="Create one for each app that signs in through this idp."
        />
      ) : (
        <LayerCard className="divide-y divide-kumo-line overflow-hidden p-0">
          {clients.map((client) => (
            <ClientRow
              key={client.client_id}
              client={client}
              defaultEmail={defaultEmail}
              onDelete={() => setDeleting(client)}
            />
          ))}
        </LayerCard>
      )}

      <NewClientDialog
        open={creating}
        defaultEmail={defaultEmail}
        onClose={() => setCreating(false)}
        onCreated={onChange}
      />
      <ConfirmDialog
        open={deleting !== null}
        title="Delete client?"
        description={`${deleting?.name ?? "This client"} won't be able to sign in through this idp anymore. This can't be undone.`}
        confirmLabel="Delete client"
        onConfirm={() => remove(deleting!)}
        onClose={() => setDeleting(null)}
      />
    </section>
  );
}

function ClientRow({
  client,
  defaultEmail,
  onDelete,
}: {
  client: Client;
  defaultEmail: string;
  onDelete: () => void;
}) {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-kumo-tint data-[panel-open]:bg-kumo-tint">
        <RowText
          title={
            <Text bold truncate>
              {client.name}
            </Text>
          }
          subtitle={client.email ?? `${defaultEmail} (default)`}
        />
        <span className="hidden sm:block">
          <Text variant="mono-secondary">{client.client_id}</Text>
        </span>
        <CaretDownIcon
          size={14}
          weight="bold"
          className="shrink-0 text-kumo-subtle [[data-panel-open]_&]:rotate-180"
        />
      </Collapsible.Trigger>
      <Collapsible.Panel className="grid gap-4 border-t border-kumo-line bg-kumo-elevated px-4 py-4">
        <dl className="grid gap-3">
          <LabeledValue label="Client ID">
            <InlineCopyText labels={{ copyAction: "Copy client ID", copied: "Client ID copied" }}>
              {client.client_id}
            </InlineCopyText>
          </LabeledValue>
          <LabeledValue label="Redirect URIs">
            <UrlList urls={client.redirect_uris} />
          </LabeledValue>
          <LabeledValue label="Post-logout redirect URIs">
            <UrlList urls={client.post_logout_redirect_uris} />
          </LabeledValue>
          <LabeledValue label="Auth method">{client.token_endpoint_auth_method}</LabeledValue>
          <LabeledValue label="Client secret">
            {client.has_secret ? "Set (shown only when created)" : "None (public client)"}
          </LabeledValue>
          <LabeledValue label="Created">{formatDate(client.created_at)}</LabeledValue>
        </dl>
        <div>
          <Button size="sm" variant="secondary-destructive" onClick={onDelete}>
            Delete client
          </Button>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

function UrlList({ urls }: { urls: string[] }) {
  if (urls.length === 0) return <Text variant="secondary">None</Text>;
  return (
    <div className="grid gap-1 break-all">
      {urls.map((url) => (
        <Text key={url} variant="mono">
          {url}
        </Text>
      ))}
    </div>
  );
}
