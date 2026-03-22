import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#111827",
      },
      {
        title: "Gringotts",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <header>
        <nav className="standard-width flex gap-4">
          <Link to="/">Import</Link>
          <Link to="/add">Add</Link>
          <Link to="/review">Review</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/summary">Summary</Link>
          <Link to="/rules">Rules</Link>
        </nav>
      </header>
      <div style={{ marginBottom: "4em" }}>
        <Outlet />
      </div>
    </>
  );
}
