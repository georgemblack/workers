import { Loader } from "@cloudflare/kumo";
import { useCallback, useEffect, useState } from "react";
import { ApiError, listClients, listCredentials, type Client, type Credential } from "../api";
import { ClientsSection } from "../admin/ClientsSection";
import { PasskeysSection } from "../admin/PasskeysSection";
import { SessionsSection } from "../admin/SessionsSection";
import { AdminLayout } from "../admin/AdminLayout";
import type { Notify, Status } from "../admin/shared";
import { mount } from "../mount";

interface Data {
  clients: Client[];
  defaultEmail: string;
  credentials: Credential[];
}

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
    <AdminLayout page="settings" status={status}>
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
    </AdminLayout>
  );
}

mount(<Admin />);
