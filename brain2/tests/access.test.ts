import { expect, it, vi } from "vitest";
import { requireAccess } from "../src/access";
it("fails closed when no Access application is configured", async () => {
  const result = await requireAccess({}, "");
  expect(result).toBeInstanceOf(Response);
  expect((result as Response).status).toBe(503);
});
it("requires an Access-authenticated invocation, regardless of client headers", async () => {
  const result = await requireAccess({}, "brain-audience");
  expect((result as Response).status).toBe(403);
});
it("rejects a different Access app before fetching identity", async () => {
  const getIdentity = vi.fn();
  const result = await requireAccess(
    { access: { aud: "other-app", getIdentity } },
    "brain-audience",
  );
  expect((result as Response).status).toBe(403);
  expect(getIdentity).not.toHaveBeenCalled();
});
it("recognizes browser identities and service identities", async () => {
  expect(
    await requireAccess(
      {
        access: {
          aud: "brain",
          getIdentity: async () => ({ email: "owner@example.test" }),
        },
      },
      "brain",
    ),
  ).toEqual({ service: false });
  expect(
    await requireAccess(
      { access: { aud: "brain", getIdentity: async () => undefined } },
      "brain",
    ),
  ).toEqual({ service: true });
});
it("fails closed if identity lookup fails", async () => {
  const result = await requireAccess(
    {
      access: {
        aud: "brain",
        getIdentity: async () => {
          throw new Error("Unavailable");
        },
      },
    },
    "brain",
  );
  expect((result as Response).status).toBe(403);
});

import { guard } from "../src/guard";
const env = { ACCESS_AUD: "brain2" };
const as = (email?: string) => ({
  access: {
    aud: "brain2",
    getIdentity: async () => (email ? { email } : undefined),
  },
});
const post = (path: string) =>
  new Request("https://brain2.example" + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
it("rejects deployed requests without Access or with the wrong audience", async () => {
  const request = new Request("https://brain2.example/");
  expect((await guard(request, env, {}))!.status).toBe(403);
  expect(
    (await guard(request, env, {
      access: { aud: "other", getIdentity: async () => undefined },
    }))!.status,
  ).toBe(403);
  // LOCAL_DEV never applies to a deployed hostname.
  expect(
    (await guard(request, { ...env, LOCAL_DEV: "true" }, {}))!.status,
  ).toBe(403);
  expect(
    await guard(
      new Request("http://localhost/"),
      { ...env, LOCAL_DEV: "true" },
      {},
    ),
  ).toBeNull();
});
it("limits service tokens to sending messages", async () => {
  expect(await guard(post("/api/messages"), env, as())).toBeNull();
  expect((await guard(post("/api/retry"), env, as()))!.status).toBe(403);
  expect(
    (await guard(new Request("https://brain2.example/api/state"), env, as()))!
      .status,
  ).toBe(403);
  expect(
    await guard(
      new Request("https://brain2.example/api/state"),
      env,
      as("owner@example.test"),
    ),
  ).toBeNull();
  expect(
    await guard(post("/api/retry"), env, as("owner@example.test")),
  ).toBeNull();
});
