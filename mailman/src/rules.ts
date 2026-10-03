// Clef scores each category from 0 to 1, and a category counts as matched above its threshold.
// Categories that move mail out of the inbox need high confidence, while "action required"
// (which keeps mail in the inbox) needs less, so uncertain emails stay in the inbox.
const MOVE_THRESHOLD = 0.8;
const KEEP_THRESHOLD = 0.4;

export type Mailbox = "archive" | "purgatory";

type Rule = {
  // The yes/no question Clef answers about the email.
  question: string;
  threshold: number;
  // What to do with a matching email. Leaving this out keeps it unread in the inbox.
  move?: { mailbox: Mailbox; emoji: string; shouldNotify?: () => boolean };
};

// Listed in priority order: an email is handled by the first category it matches.
// Emails that match nothing stay unread in the inbox.
export const CATEGORIES = {
  action_required: {
    question:
      "Does this email require the recipient to take action, such as replying to someone, paying a bill, signing something, confirming an appointment, or fixing an account problem? Receipts, routine alerts, ads, and newsletters don't count.",
    threshold: KEEP_THRESHOLD,
  },
  order: {
    question:
      "Is this email about an order the recipient placed, such as a confirmation, receipt, shipping or delivery update, or return/refund?",
    threshold: MOVE_THRESHOLD,
    move: { mailbox: "archive", emoji: "📦" },
  },
  capital_one: {
    question:
      "Is this a Capital One alert about a purchase or transaction on the recipient's card or account?",
    threshold: MOVE_THRESHOLD,
    move: { mailbox: "purgatory", emoji: "💳" },
  },
  terms: {
    question:
      "Is this a company announcing changes to its terms of service, privacy policy, or user agreement?",
    threshold: MOVE_THRESHOLD,
    move: { mailbox: "purgatory", emoji: "📜" },
  },
  promo: {
    question: "Is this email an ad, sale, offer, or other marketing message, or a newsletter?",
    threshold: MOVE_THRESHOLD,
    move: { mailbox: "purgatory", emoji: "📰" },
  },
  capmetro: {
    question:
      "Is this a CapMetro (Austin transit) service alert about MetroRail, such as delays, disruptions, or schedule changes?",
    threshold: MOVE_THRESHOLD,
    move: { mailbox: "purgatory", emoji: "🚆", shouldNotify: isWednesdayOrThursday },
  },
} satisfies Record<string, Rule>;

export type Category = keyof typeof CATEGORIES;

export type Action = {
  category: Category;
  mailbox: Mailbox;
  emoji: string;
  notify: boolean;
};

// Returns what to do with an email given the categories it matched, or null to leave it in the inbox.
export function decide(matches: Set<Category>): Action | null {
  for (const [category, rule] of Object.entries(CATEGORIES) as [Category, Rule][]) {
    if (!matches.has(category)) continue;
    if (!rule.move) return null;
    const { mailbox, emoji, shouldNotify } = rule.move;
    return { category, mailbox, emoji, notify: shouldNotify?.() ?? true };
  }
  return null;
}

function isWednesdayOrThursday(): boolean {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
  }).format(new Date());
  return weekday === "Wed" || weekday === "Thu";
}
