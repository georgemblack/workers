import type { Email } from "./fastmail";
import { CATEGORIES, type Category } from "./rules";

const CLASSIFY_MODEL = "@cf/cloudflare/clef";
const SUMMARY_MODEL = "@cf/openai/gpt-oss-20b";

// Clef isn't in the generated Workers AI types yet, so its request and response shapes are declared here.
type ClefModels = {
  [CLASSIFY_MODEL]: {
    inputs: {
      model: "clef";
      state: unknown;
      questions: Record<string, { type: "noul"; instructions: string }>;
    };
    postProcessedOutputs: { answers: Record<string, { noul: number }> };
  };
};

export type Classification = {
  matches: Set<Category>;
  probabilities: Partial<Record<Category, number>>;
};

// Asks Clef one yes/no question per category and returns every category that matched.
export async function classify(env: CloudflareBindings, email: Email): Promise<Classification> {
  const ai = env.AI as unknown as Ai<ClefModels>;
  const categories = Object.keys(CATEGORIES) as Category[];

  const { answers } = await ai.run(CLASSIFY_MODEL, {
    model: "clef",
    state: { from: email.from, subject: email.subject, body: email.body.substring(0, 8000) },
    questions: Object.fromEntries(
      categories.map((c) => [c, { type: "noul", instructions: CATEGORIES[c].question }]),
    ),
  });

  const matches = new Set<Category>();
  const probabilities: Partial<Record<Category, number>> = {};
  for (const category of categories) {
    const probability = answers?.[category]?.noul;
    if (typeof probability !== "number") {
      throw new Error(`Clef returned no answer for "${category}"`);
    }
    probabilities[category] = Math.round(probability * 1000) / 1000;
    if (probability > CATEGORIES[category].threshold) matches.add(category);
  }
  return { matches, probabilities };
}

// Writes a one-sentence summary for a push notification.
export async function summarize(env: CloudflareBindings, email: Email): Promise<string> {
  const response = await env.AI.run(SUMMARY_MODEL, {
    instructions:
      "Summarize the email as a single short sentence suitable for an iOS push notification. Respond with only the sentence: no quotes, no emoji, no preamble. For bank/credit card transactions include the card name, amount, and merchant. For orders and shipping include the order status and item(s).",
    input: `From: ${email.from}\nSubject: ${email.subject}\n\n${email.body.substring(0, 4000)}`,
    reasoning: { effort: "low" },
  });
  return responseText(response);
}

function responseText(response: XOR<ResponsesOutput, ChatCompletionsOutput>): string {
  if (response.choices) return response.choices[0]?.message.content?.trim() ?? "";
  if (response.output_text) return response.output_text.trim();
  return (response.output ?? [])
    .flatMap((item) => (item.type === "message" ? item.content : []))
    .map((part) => (part.type === "output_text" ? part.text : ""))
    .join("")
    .trim();
}
