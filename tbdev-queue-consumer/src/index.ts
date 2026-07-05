export default {
  async queue(batch): Promise<void> {
    for (const message of batch.messages) {
      message.ack();
    }
  },
} satisfies ExportedHandler<Env>;
