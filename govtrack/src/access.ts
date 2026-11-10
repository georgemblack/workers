/** The Worker serves HTML directly, so Access must authenticate every invocation. */
export async function requireAccess(
  ctx: Pick<ExecutionContext, "access">,
  audience: string,
): Promise<{ service: boolean } | Response> {
  if (!audience) {
    return Response.json(
      { error: "Access is not configured" },
      { status: 503 },
    );
  }
  if (!ctx.access || ctx.access.aud !== audience) {
    return Response.json({ error: "Access required" }, { status: 403 });
  }
  try {
    const identity = await ctx.access.getIdentity();
    return { service: !identity?.email };
  } catch {
    return Response.json(
      { error: "Unable to verify Access identity" },
      { status: 403 },
    );
  }
}
