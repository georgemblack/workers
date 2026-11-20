// Paid scenarios for the core module. Fictional data only.
export const scenarios = [
  {
    name: "core: a note is saved and found again",
    messages: [
      "note that the wifi password is on the fridge",
      "where's the wifi password?",
    ],
    check({ nodes, replies }) {
      const problems = [];
      const notes = nodes.filter((n) => n.type === "note");
      if (notes.length !== 1)
        problems.push(`expected 1 note, got ${notes.length}`);
      // The model may write "Wi-Fi" with any hyphen.
      if (!notes.some((n) => /wi\W?fi/i.test(n.title + n.body)))
        problems.push("note does not mention the wifi");
      if (nodes.some((n) => n.type !== "note" && n.type !== "profile"))
        problems.push("created something other than a note");
      if (!/fridge/i.test(replies.at(-1).reply))
        problems.push("answer does not say the fridge");
      return problems;
    },
  },
];
