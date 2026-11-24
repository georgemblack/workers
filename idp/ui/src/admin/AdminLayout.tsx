import { Banner, Link } from "@cloudflare/kumo";
import type { ReactNode } from "react";
import type { Status } from "./shared";

const PAGES = {
  settings: { label: "Settings", href: "/admin" },
  activity: { label: "Activity", href: "/admin/activity" },
};

// The header, navigation and status banner shared by every admin page.
export function AdminLayout({
  page,
  status,
  children,
}: {
  page: keyof typeof PAGES;
  status: Status;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-kumo-line bg-kumo-base">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <span className="truncate font-semibold text-kumo-strong">idp.george.black</span>
          <nav className="flex shrink-0 items-center gap-3 text-sm sm:gap-4">
            {Object.entries(PAGES).map(([key, { label, href }]) =>
              key === page ? (
                <span key={key} aria-current="page" className="font-semibold text-kumo-strong">
                  {label}
                </span>
              ) : (
                <Link key={key} href={href}>
                  {label}
                </Link>
              ),
            )}
            <span className="hidden sm:inline">
              <Link href="/.well-known/openid-configuration" target="_blank">
                Discovery
              </Link>
            </span>
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
        {children}
      </main>
    </div>
  );
}
