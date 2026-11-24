import { Banner, Link, Loader } from "@cloudflare/kumo";
import { useCallback, useEffect, useState } from "react";
import { ApiError, listClients, listCredentials, type Client, type Credential } from "../api";
import { ClientsSection } from "../admin/ClientsSection";
import { PasskeysSection } from "../admin/PasskeysSection";
import { SessionsSection } from "../admin/SessionsSection";
import type { Notify } from "../admin/shared";
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
      // Signed out: go sign in, then come back here.
      if (e instanceof ApiError && e.status === 401) location.replace("/login?next=/admin");
      else setStatus({ kind: "error", message: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const notify: Notify = (kind, message) => setStatus({ kind, message });

  return (
    <div className="min-h-screen">
      <header className="border-b border-kumo-line bg-kumo-base">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <span className="font-semibold text-kumo-strong">idp.george.black</span>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/.well-known/openid-configuration" target="_blank">
              Discovery
            </Link>
            <Link href="/logout">Sign out</Link>
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
              notify={notify}
            />
            <PasskeysSection credentials={data.credentials} onChange={load} notify={notify} />
            <SessionsSection notify={notify} />
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
