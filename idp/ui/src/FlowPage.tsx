import type { ReactNode } from "react";

// A full-screen page with the slow-moving gradient behind it and its content
// centered. Used by the sign-in and sign-out pages.
export function FlowPage({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <div className="flow-bg" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      {children}
    </main>
  );
}
