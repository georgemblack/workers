import { Banner, Link, Loader } from "@cloudflare/kumo";
import { useCallback, useEffect, useState } from "react";
import {
  getAuthState,
  listClients,
  listCredentials,
  signOut,
  type Client,
  type Credential,
} from "../api";
import { ClientsSection } from "../admin/ClientsSection";
import { PasskeysSection } from "../admin/PasskeysSection";
import { mount } from "../mount";

interface Data {
  clients: Client[];
  defaultEmail: string;
  credentials: Credential[];
}

type Status = { kind: "error" | "success"; message: string } | null;

function Admin() {
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<Status>(null);

  const load = useCallback(async () => {
    try {
      const [clients, credentials] = await Promise.all([listClients(), listCredentials()]);
      setData({
        clients: clients.clients,
        defaultEmail: clients.default_email,
        credentials: credentials.credentials,
      });
    } catch (e) {
      setStatus({ kind: "error", message: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    getAuthState()
      .then((state) => {
        if (state.authenticated) return load();
        location.replace("/login?next=/admin");
      })
      .catch((e: Error) => setStatus({ kind: "error", message: e.message }));
  }, [load]);

  async function handleSignOut() {
    await signOut();
    location.replace("/login");
  }

  const showError = (message: string) => setStatus({ kind: "error", message });
  const showSuccess = (message: string) => setStatus({ kind: "success", message });

  return (
    <div className="min-h-screen">
      <header className="border-b border-kumo-line bg-kumo-base">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <span className="font-semibold text-kumo-strong">idp.george.black</span>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/.well-known/openid-configuration" target="_blank">
              Discovery
            </Link>
            <Link
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                void handleSignOut();
              }}
            >
              Sign out
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-4xl gap-8 px-4 py-6">
        {status && (
          <Banner
            variant={status.kind === "error" ? "error" : "default"}
            description={status.message}
          />
        )}
        {data ? (
          <>
            <ClientsSection
              clients={data.clients}
              defaultEmail={data.defaultEmail}
              onChange={load}
              onError={showError}
            />
            <PasskeysSection
              credentials={data.credentials}
              onChange={load}
              onError={showError}
              onSuccess={showSuccess}
            />
          </>
        ) : (
          !status && (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          )
        )}
      </main>
    </div>
  );
}

mount(<Admin />);
