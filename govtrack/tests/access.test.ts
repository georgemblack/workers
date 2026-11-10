import { expect, it, vi } from "vitest";
import { requireAccess } from "../src/access";
it("fails closed when no Access application is configured", async () => {
  const result = await requireAccess({}, "");
  expect(result).toBeInstanceOf(Response);
  expect((result as Response).status).toBe(503);
});
it("requires an Access-authenticated invocation, regardless of client headers", async () => {
  const result = await requireAccess({}, "govtrack-audience");
  expect((result as Response).status).toBe(403);
});
it("rejects a different Access app before fetching identity", async () => {
  const getIdentity = vi.fn();
  const result = await requireAccess(
    { access: { aud: "other-app", getIdentity } },
    "govtrack-audience",
  );
  expect((result as Response).status).toBe(403);
  expect(getIdentity).not.toHaveBeenCalled();
});
it("recognizes browser identities and service identities", async () => {
  expect(
    await requireAccess(
      {
        access: {
          aud: "govtrack",
          getIdentity: async () => ({ email: "owner@example.test" }),
        },
      },
      "govtrack",
    ),
  ).toEqual({ service: false });
  expect(
    await requireAccess(
      { access: { aud: "govtrack", getIdentity: async () => undefined } },
      "govtrack",
    ),
  ).toEqual({ service: true });
});
it("fails closed if identity lookup fails", async () => {
  const result = await requireAccess(
    {
      access: {
        aud: "govtrack",
        getIdentity: async () => {
          throw new Error("Unavailable");
        },
      },
    },
    "govtrack",
  );
  expect((result as Response).status).toBe(403);
});
