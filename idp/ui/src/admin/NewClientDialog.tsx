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
import { useEffect, useState } from "react";
import { createClient, type CreatedClient } from "../api";

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

// The "New client" form. Access clients only need team names; other apps
// need full redirect URIs. Clients can't be edited once created.
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
  const [kind, setKind] = useState<Kind>("access");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [teams, setTeams] = useState("");
  const [redirects, setRedirects] = useState("");
  const [logoutRedirects, setLogoutRedirects] = useState("");
  const [method, setMethod] = useState("client_secret_basic");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedClient | null>(null);

  // Start the email field with the default email each time the form opens.
  useEffect(() => {
    if (open) setEmail((current) => current || defaultEmail);
  }, [open, defaultEmail]);

  function reset() {
    setKind("access");
    setName("");
    setEmail("");
    setTeams("");
    setRedirects("");
    setLogoutRedirects("");
    setMethod("client_secret_basic");
    setError(null);
    setCreated(null);
  }

  function close() {
    onClose();
    reset();
  }

  async function submit() {
    const isAccess = kind === "access";
    const redirectUris = isAccess ? lines(teams).map(accessCallback) : lines(redirects);
    const clientEmail = email.trim();
    if (!name.trim() || !clientEmail || redirectUris.length === 0) {
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
          email: clientEmail,
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

  const origin = location.origin;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && close()}>
      <Dialog className="grid max-h-[90vh] w-full max-w-lg gap-4 overflow-y-auto px-6 py-5">
        <Dialog.Title className="text-base font-semibold">
          {created ? "Client created" : "New client"}
        </Dialog.Title>

        {created ? (
          <div className="grid gap-4">
            <Setting label="Client ID" value={created.client_id} />
            {created.client_secret && (
              <div className="grid gap-1.5">
                <Setting label="Client secret" value={created.client_secret} />
                <Text variant="secondary" size="sm">
                  Save this now. It won't be shown again.
                </Text>
              </div>
            )}
            {kind === "access" ? (
              <>
                <Setting label="Auth URL" value={`${origin}/authorize`} />
                <Setting label="Token URL" value={`${origin}/token`} />
                <Setting label="Certificate URL" value={`${origin}/.well-known/jwks.json`} />
              </>
            ) : (
              <>
                <Setting label="Issuer" value={origin} />
                <Setting
                  label="Discovery URL"
                  value={`${origin}/.well-known/openid-configuration`}
                />
                <Text variant="secondary" size="sm">
                  The app must support PKCE (S256).
                </Text>
              </>
            )}
            <div className="flex justify-end">
              <Button variant="primary" onClick={close}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
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
              value={method}
              onValueChange={(value) =>
                setMethod((value as string | null) ?? "client_secret_basic")
              }
              items={AUTH_METHODS}
            />
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={close}>
                Cancel
              </Button>
              <Button variant="primary" loading={busy} onClick={submit}>
                Create
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </Dialog.Root>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1.5">
      <Text variant="secondary" size="sm">
        {label}
      </Text>
      <ClipboardText size="sm" text={value} />
    </div>
  );
}
