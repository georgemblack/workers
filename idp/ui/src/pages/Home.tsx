import { Loader } from "@cloudflare/kumo";
import { useEffect } from "react";
import { getAuthState } from "../api";
import { mount } from "../mount";

// The home page just sends you to the admin page or the sign-in page.
function Home() {
  useEffect(() => {
    getAuthState()
      .then((state) => location.replace(state.authenticated ? "/admin" : "/login"))
      .catch(() => location.replace("/login"));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Loader />
    </main>
  );
}

mount(<Home />);
