import {
  Banner,
  Button,
  ClipboardText,
  Dialog,
  Input,
  InputArea,
  Radio,
  Select,
  Text,
} from "@cloudflare/kumo";
import { useState } from "react";
import { createClient, type CreatedClient } from "../api";
import { DialogActions, DialogHeader, LabeledValue } from "./shared";

type Kind = "access" | "other";

const AUTH_METHODS = {
  client_secret_basic: "client_secret_basic (confidential)",
  client_secret_post: "client_secret_post",
  none: "none (public + PKCE)",
};

function lines(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Accepts "george", "george.cloudflareaccess.com" or a full URL.
function accessCallback(team: string): string {
  const name = team
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .replace(/\.cloudflareaccess\.com$/, "");
  return `https://${name}.cloudflareaccess.com/cdn-cgi/access/callback`;
}

// The "New client" dialog. Clients can't be edited once created.
export function NewClientDialog({
  open,
  defaultEmail,
  onClose,
  onCreated,
}: {
  open: boolean;
  defaultEmail: string;
  onClose: () => void;
  onCreated: () => void;
}) {
  // A new key each time the dialog opens starts the form over from scratch.
  const [formKey, setFormKey] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setFormKey((key) => key + 1);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog size="lg" className="px-6 py-5">
        <NewClientForm
          key={formKey}
          defaultEmail={defaultEmail}
          onCreated={onCreated}
          onDone={onClose}
        />
      </Dialog>
    </Dialog.Root>
  );
}

// Access clients only need team names; other apps need full redirect URIs.
function NewClientForm({
  defaultEmail,
  onCreated,
  onDone,
}: {
  defaultEmail: string;
  onCreated: () => void;
  onDone: () => void;
}) {
  const [kind, setKind] = useState<Kind>("access");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [teams, setTeams] = useState("");
  const [redirects, setRedirects] = useState("");
  const [logoutRedirects, setLogoutRedirects] = useState("");
  const [method, setMethod] = useState("client_secret_basic");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedClient | null>(null);

  async function submit() {
    const isAccess = kind === "access";
    const redirectUris = isAccess ? lines(teams).map(accessCallback) : lines(redirects);
    if (!name.trim() || !email.trim() || redirectUris.length === 0) {
      const what = isAccess ? "team name" : "redirect URI";
      setError(`Name, email and at least one ${what} are required.`);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      setCreated(
        await createClient({
          name: name.trim(),
          email: email.trim(),
          redirect_uris: redirectUris,
          post_logout_redirect_uris: isAccess ? [] : lines(logoutRedirects),
          token_endpoint_auth_method: method,
        }),
      );
      onCreated();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (created) return <CreatedClientDetails kind={kind} client={created} onDone={onDone} />;

  return (
    <div className="grid gap-4">
      <DialogHeader title="New client" />
      {error && <Banner variant="error" description={error} />}
      <Radio.Group
        legend="Type"
        appearance="segmented"
        value={kind}
        onValueChange={(value) => setKind(value as Kind)}
      >
        <Radio.Item label="Cloudflare Access" value="access" />
        <Radio.Item label="Other app" value="other" />
      </Radio.Group>
      <Input
        label="Name"
        placeholder="e.g. linkmgr"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {kind === "access" ? (
        <InputArea
          label="Access team names"
          description="One per line."
          placeholder="george"
          value={teams}
          onValueChange={setTeams}
        />
      ) : (
        <>
          <InputArea
            label="Redirect URIs"
            description="One per line."
            placeholder="https://example.com/callback"
            value={redirects}
            onValueChange={setRedirects}
          />
          <InputArea
            label="Post-logout redirect URIs"
            description="One per line. Optional."
            placeholder="https://example.com/"
            value={logoutRedirects}
            onValueChange={setLogoutRedirects}
          />
        </>
      )}
      <Select
        label="Token endpoint auth method"
        className="w-full"
        value={method}
        onValueChange={(value) => setMethod((value as string | null) ?? "client_secret_basic")}
        items={AUTH_METHODS}
      />
      <DialogActions>
        <Button variant="primary" loading={busy} onClick={submit}>
          Create
        </Button>
      </DialogActions>
    </div>
  );
}

// What to copy into the app after creating a client. The secret is only
// shown here, once.
function CreatedClientDetails({
  kind,
  client,
  onDone,
}: {
  kind: Kind;
  client: CreatedClient;
  onDone: () => void;
}) {
  const origin = location.origin;
  const values: [string, string][] = [["Client ID", client.client_id]];
  if (client.client_secret) values.push(["Client secret", client.client_secret]);
  if (kind === "access") {
    values.push(
      ["Auth URL", `${origin}/authorize`],
      ["Token URL", `${origin}/token`],
      ["Certificate URL", `${origin}/.well-known/jwks.json`],
    );
  } else {
    values.push(
      ["Issuer", origin],
      ["Discovery URL", `${origin}/.well-known/openid-configuration`],
    );
  }

  return (
    <div className="grid gap-4">
      <DialogHeader
        title="Client created"
        description={
          client.client_secret
            ? "Save the client secret now. It won't be shown again."
            : "This is a public client, so there's no secret."
        }
      />
      <dl className="grid gap-3">
        {values.map(([label, value]) => (
          <LabeledValue key={label} label={label}>
            <ClipboardText size="sm" text={value} />
          </LabeledValue>
        ))}
      </dl>
      {kind === "other" && (
        <Text variant="secondary" size="sm">
          The app must support PKCE (S256).
        </Text>
      )}
      <div className="flex justify-end">
        <Button variant="primary" onClick={onDone}>
          Done
        </Button>
      </div>
    </div>
  );
}
