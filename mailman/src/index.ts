export default {
  async fetch(req) {
    const url = new URL(req.url);
    url.pathname = "/__scheduled";
    url.searchParams.append("cron", "* * * * *");
    return new Response(
      `To test the scheduled handler, ensure you have used the "--test-scheduled" then try running "curl ${url.href}".`,
    );
  },

  async scheduled(event, env, ctx): Promise<void> {
    let resp = await fetch("https://api.cloudflare.com/client/v4/ips");
    let wasSuccessful = resp.ok ? "success" : "fail";
    console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
  },
} satisfies ExportedHandler<Env>;
