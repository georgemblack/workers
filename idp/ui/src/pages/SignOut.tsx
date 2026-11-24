import { Button, Text } from "@cloudflare/kumo";
import { SignOutIcon } from "@phosphor-icons/react";
import { mount } from "../mount";

const params = new URLSearchParams(location.search);
const done = params.has("done");
params.delete("done");

// /logout sends you here to confirm signing out when it can't tell the request
// came from one of your apps, and again once you're signed out. The button
// posts the original request back to /logout, so an app can still send you
// back to itself afterwards.
function SignOut() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <div className="flow-bg" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      {done ? (
        <Text>You're signed out.</Text>
      ) : (
        <form method="post" action="/logout">
          {[...params].map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <input type="hidden" name="confirm" value="1" />
          <Button type="submit" variant="primary" icon={<SignOutIcon />}>
            Sign out of idp.george.black
          </Button>
        </form>
      )}
    </main>
  );
}

mount(<SignOut />);
