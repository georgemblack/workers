import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Kumo switches to dark colors with a `data-mode="dark"` attribute rather
// than following the system setting by itself, so mirror the system setting.
function followSystemTheme() {
  const dark = window.matchMedia("(prefers-color-scheme: dark)");
  const apply = () => {
    document.documentElement.dataset.mode = dark.matches ? "dark" : "light";
  };
  apply();
  dark.addEventListener("change", apply);
}

// Every page calls this once to render itself into #root.
export function mount(page: ReactNode) {
  followSystemTheme();
  createRoot(document.getElementById("root")!).render(<StrictMode>{page}</StrictMode>);
}
