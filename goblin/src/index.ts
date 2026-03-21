interface QueueMessage {
	key: string;
	description: string;
}

interface AiResponse {
	response: string;
}

async function getMerchantExamples(db: D1Database): Promise<string[]> {
	const result = await db
		.prepare(
			`SELECT merchant, COUNT(*) as cnt
       FROM transactions
       WHERE merchant IS NOT NULL AND merchant != ''
       GROUP BY merchant
       ORDER BY cnt DESC
       LIMIT 25`,
		)
		.all<{ merchant: string }>();
	return result.results.map((row) => row.merchant);
}

function buildPrompt(description: string, examples: string[]): string {
	const exampleList =
		examples.length > 0 ? `\n\nHere are existing merchant names for reference:\n${examples.map((e) => `- ${e}`).join('\n')}` : '';

	return `Given the following bank transaction description, determine the merchant name. Respond with ONLY the merchant name, nothing else. Use proper capitalization and the common/well-known name for the merchant (e.g. "Amazon" not "AMZN MKTP US").${exampleList}

Transaction description: ${description}`;
}

export default {
	async queue(batch: MessageBatch, env: Env): Promise<void> {
		const examples = await getMerchantExamples(env.DB);

		for (const message of batch.messages) {
			const { key, description } = message.body as QueueMessage;
			const prompt = buildPrompt(description, examples);

			try {
				const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
					messages: [{ role: 'user', content: prompt }],
					max_tokens: 64,
				});

				const merchantName = (result as AiResponse).response?.trim();
				if (!merchantName) {
					console.error(`Empty AI response for transaction ${key}`);
					message.ack();
					continue;
				}

				await env.DB.prepare('UPDATE transactions SET merchant_suggestion = ? WHERE key = ?').bind(merchantName, key).run();

				message.ack();
			} catch (err) {
				console.error(`Failed to process transaction ${key}:`, err);
				message.retry();
			}
		}
	},
} satisfies ExportedHandler<Env>;
