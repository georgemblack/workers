interface QueueMessage {
  key: string;
  description: string;
}

interface Rule {
  merchant: string;
  category: string;
}

interface ChatCompletionResult {
  choices?: {
    message?: {
      content?: string | null;
    };
    finish_reason?: string;
  }[];
  usage?: unknown;
}

function getErrorDetails(err: unknown): Record<string, unknown> {
  if (!(err instanceof Error)) {
    return { error: err };
  }

  const error = err as Error & { code?: unknown };
  return {
    errorName: error.name,
    errorMessage: error.message,
    errorCode: error.code,
    errorCause:
      error.cause instanceof Error ? `${error.cause.name}: ${error.cause.message}` : error.cause,
    errorStack: error.stack,
  };
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

async function getRules(db: D1Database): Promise<Map<string, string>> {
  const result = await db.prepare("SELECT merchant, category FROM rules").all<Rule>();
  const map = new Map<string, string>();
  for (const row of result.results) {
    map.set(row.merchant, row.category);
  }
  return map;
}

function buildPrompt(description: string, examples: string[]): string {
  const exampleList =
    examples.length > 0
      ? `\n\nHere are some existing merchant names for reference:\n${examples.map((e) => `- ${e}`).join("\n")}`
      : "";

  return `Given the following bank transaction description, determine the merchant name. Respond with ONLY the merchant name, nothing else. Use proper capitalization and the common/well-known name for the merchant (e.g. "Amazon" not "AMZN MKTP US").${exampleList}

Transaction description: ${description}`;
}

export default {
  async queue(batch: MessageBatch, env: Env): Promise<void> {
    const examples = await getMerchantExamples(env.DB);
    const rules = await getRules(env.DB);

    for (const message of batch.messages) {
      const { key, description } = message.body as QueueMessage;
      const prompt = buildPrompt(description, examples);

      try {
        const result = (await env.AI.run("@cf/zai-org/glm-5.3-flash", {
          messages: [{ role: "user", content: prompt }],
          max_completion_tokens: 64,
          reasoning_effort: "low",
        })) as ChatCompletionResult;

        const merchantName = result.choices?.[0]?.message?.content?.trim();
        if (!merchantName) {
          console.error(`Empty AI response for transaction ${key}`, {
            finishReason: result.choices?.[0]?.finish_reason,
            usage: result.usage,
          });
          message.retry();
          continue;
        }

        const category = rules.get(merchantName) ?? null;
        await env.DB.prepare("UPDATE transactions SET merchant = ?, category = ? WHERE key = ?")
          .bind(merchantName, category, key)
          .run();

        message.ack();
      } catch (err) {
        console.error({
          event: "transaction-processing-failed",
          transactionKey: key,
          queueMessageId: message.id,
          attempt: message.attempts,
          ...getErrorDetails(err),
        });
        message.retry();
      }
    }
  },
} satisfies ExportedHandler<Env>;
