/**
 * The Pi adapter asks for raw Responses. Some Workers AI/local proxy paths
 * return a decoded completion or stream despite returnRawResponse. Normalize
 * those shapes at the binding boundary, keeping the provider code untouched.
 */
export function rawResponse(value: unknown): Response {
  if (value instanceof Response) return value;
  // Miniflare's remote binding returns its own Response class in Node.
  // Preserve its stream and status instead of serializing it as an empty JSON object.
  if (
    value &&
    typeof value === "object" &&
    "headers" in value &&
    "status" in value &&
    "body" in value
  ) {
    const response = value as Response;
    if (
      typeof response.headers?.get === "function" &&
      typeof response.status === "number"
    ) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });
    }
  }
  if (value instanceof ReadableStream) {
    return new Response(value, {
      headers: { "Content-Type": "text/event-stream" },
    });
  }
  if (value && typeof value === "object") return Response.json(value);
  throw new Error("Workers AI returned no response");
}
export function compatibleAI(
  binding: Ai,
  requiredHeaders: Record<string, string> = {},
): Ai {
  return new Proxy(binding, {
    get(target, key) {
      if (key === "run")
        return async (...args: unknown[]) => {
          if (Object.keys(requiredHeaders).length) {
            const options = args[2] as
              { extraHeaders?: Record<string, string> } | undefined;
            args[2] = {
              ...options,
              extraHeaders: { ...options?.extraHeaders, ...requiredHeaders },
            };
          }
          const value = await Reflect.apply(target.run, target, args);
          const options = args[2] as
            { returnRawResponse?: boolean } | undefined;
          return options?.returnRawResponse ? rawResponse(value) : value;
        };
      const value = Reflect.get(target, key, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}
