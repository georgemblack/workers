export default {
  async tail(events): Promise<void> {
    console.log(`received ${events.length} trace event(s)`);
  },
} satisfies ExportedHandler<Env>;
