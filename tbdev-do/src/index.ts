import { DurableObject } from "cloudflare:workers";

export class TbdevDurableObject extends DurableObject<Env> {}

export class TbdevSqliteDurableObject extends DurableObject<Env> {}

export default {
  async fetch(): Promise<Response> {
    return new Response("ok");
  },
} satisfies ExportedHandler<Env>;
