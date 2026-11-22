import { Button, Empty, LayerCard, Table, Text } from "@cloudflare/kumo";
import { CaretDownIcon, PlugsConnectedIcon, PlusIcon } from "@phosphor-icons/react";
import { Fragment, useState } from "react";
import { deleteClient, type Client } from "../api";
import { ConfirmDialog } from "./ConfirmDialog";
import { NewClientDialog } from "./NewClientDialog";

// The OIDC clients table. Each row shows the basics; clicking it opens the
// rest of the client's details, including Delete.
export function ClientsSection({
  clients,
  defaultEmail,
  onChange,
  onError,
}: {
  clients: Client[];
  defaultEmail: string;
  onChange: () => void;
  onError: (message: string) => void;
}) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Client | null>(null);

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function confirmDelete() {
    if (!deleting) return;
    const id = deleting.client_id;
    setDeleting(null);
    try {
      await deleteClient(id);
      onChange();
    } catch (e) {
      onError(`Couldn't delete the client: ${(e as Error).message}`);
    }
  }

  return (
    <section className="grid gap-3">
      <div className="flex items-center justify-between gap-4">
        <Text variant="heading" as="h2">
          OIDC clients
        </Text>
        <Button size="sm" icon={<PlusIcon />} onClick={() => setCreating(true)}>
          New client
        </Button>
      </div>

      {clients.length === 0 ? (
        <LayerCard>
          <LayerCard.Primary>
            <Empty
              size="sm"
              icon={<PlugsConnectedIcon size={32} className="text-kumo-inactive" />}
              title="No clients yet"
              description="Create one for each app that signs in through this idp."
            />
          </LayerCard.Primary>
        </LayerCard>
      ) : (
        <LayerCard className="overflow-hidden p-0">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head className="hidden sm:table-cell">Client ID</Table.Head>
                <Table.Head>Email</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {clients.map((client) => {
                const isOpen = open.has(client.client_id);
                return (
                  <Fragment key={client.client_id}>
                    <Table.Row
                      variant={isOpen ? "selected" : "default"}
                      className="cursor-pointer hover:bg-kumo-tint"
                      onClick={() => toggle(client.client_id)}
                    >
                      <Table.Cell>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          className="flex items-center gap-1.5 font-medium text-kumo-strong"
                        >
                          {client.name}
                          <CaretDownIcon
                            size={12}
                            weight="bold"
                            className={isOpen ? "rotate-180" : undefined}
                          />
                        </button>
                      </Table.Cell>
                      <Table.Cell className="hidden sm:table-cell">
                        <Text variant="mono-secondary">{client.client_id}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        {client.email ?? (
                          <>
                            {defaultEmail}{" "}
                            <Text variant="secondary" as="span">
                              (default)
                            </Text>
                          </>
                        )}
                      </Table.Cell>
                    </Table.Row>
                    {isOpen && (
                      <Table.Row variant="selected">
                        <Table.Cell colSpan={3} className="pt-0">
                          <ClientDetails client={client} onDelete={() => setDeleting(client)} />
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Fragment>
                );
              })}
            </Table.Body>
          </Table>
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
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
    </section>
  );
}

function ClientDetails({ client, onDelete }: { client: Client; onDelete: () => void }) {
  return (
    <div className="grid gap-4 border-l-2 border-kumo-line py-1 pl-4">
      <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[max-content_1fr]">
        <Detail label="Client ID" className="sm:hidden">
          <Text variant="mono">{client.client_id}</Text>
        </Detail>
        <Detail label="Redirect URIs">
          <UrlList urls={client.redirect_uris} />
        </Detail>
        <Detail label="Post-logout redirect URIs">
          <UrlList urls={client.post_logout_redirect_uris} />
        </Detail>
        <Detail label="Auth method">{client.token_endpoint_auth_method}</Detail>
        <Detail label="Client secret">
          {client.has_secret ? "Set (shown only when created)" : "None (public client)"}
        </Detail>
        <Detail label="Created">{client.created_at}</Detail>
      </dl>
      <div>
        <Button size="sm" variant="secondary-destructive" onClick={onDelete}>
          Delete client
        </Button>
      </div>
    </div>
  );
}

function Detail({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`contents ${className ?? ""}`}>
      <Text variant="secondary" as="dt">
        {label}
      </Text>
      <dd className="mb-2 min-w-0 sm:mb-0">{children}</dd>
    </div>
  );
}

function UrlList({ urls }: { urls: string[] }) {
  if (urls.length === 0) return <Text variant="secondary">None</Text>;
  return (
    <div className="grid gap-1">
      {urls.map((url) => (
        <span key={url} className="font-mono text-[0.9em] break-all">
          {url}
        </span>
      ))}
    </div>
  );
}
