// Clef scores each category from 0 to 1, and a category counts as matched above this threshold.
// It's set high so that when Clef is unsure, the email stays in the inbox.
export const MATCH_THRESHOLD = 0.8;

export type Mailbox = "archive" | "purgatory";

type Rule = {
  // The yes/no question Clef answers about the email.
  question: string;
  // Where a matching email is moved (and marked as read).
  mailbox: Mailbox;
  // Shown at the start of the notification.
  emoji: string;
  // Defaults to always notifying.
  shouldNotify?: () => boolean;
};

// Listed in priority order: an email is handled by the first category it matches.
// Archive categories come first, then Purgatory. Emails that match nothing stay unread in the inbox.
export const CATEGORIES = {
  bill: {
    question:
      "Is this email a bill, invoice, statement, or payment reminder for the recipient, such as an amount due or an upcoming payment?",
    mailbox: "archive",
    emoji: "🧾",
  },
  order: {
    question:
      "Is this email about an order the recipient placed, such as a confirmation, receipt, shipping or delivery update, or return/refund?",
    mailbox: "archive",
    emoji: "📦",
  },
  travel: {
    question:
      "Is this email about a trip or reservation the recipient booked, such as a flight, hotel, rental car, or restaurant confirmation, itinerary change, or check-in reminder?",
    mailbox: "archive",
    emoji: "✈️",
  },
  capital_one: {
    question:
      "Is this a Capital One alert about a purchase or transaction on the recipient's card or account?",
    mailbox: "purgatory",
    emoji: "💳",
  },
  security: {
    question:
      "Is this an automated security or account alert, such as a new sign-in, new device, password change, or change to account settings? One-time verification codes don't count.",
    mailbox: "purgatory",
    emoji: "🔐",
  },
  terms: {
    question:
      "Is this a company announcing changes to its terms of service, privacy policy, or user agreement?",
    mailbox: "purgatory",
    emoji: "📜",
  },
  promo: {
    question: "Is this email an ad, sale, offer, or other marketing message, or a newsletter?",
    mailbox: "purgatory",
    emoji: "📰",
  },
  capmetro: {
    question:
      "Is this a CapMetro (Austin transit) service alert about MetroRail, such as delays, disruptions, or schedule changes?",
    mailbox: "purgatory",
    emoji: "🚆",
    shouldNotify: isWednesdayOrThursday,
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
    const { mailbox, emoji, shouldNotify } = rule;
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
