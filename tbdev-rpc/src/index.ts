import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint<Env> {
  async fetch(): Promise<Response> {
    return new Response("ok");
  }
}
