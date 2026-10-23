# Agent acceptance scenarios

Run these sequences against an isolated local brain, with Workers AI enabled. Review stored records and source evidence, not only the assistant reply. These are fixtures, not facts about the user.

1. Establish: "We are expecting a baby on May 15, 2027. Need to get baby supplies ready beforehand." Then, as a separate message: "I need to buy size 1 diapers." Expect a linked supplies child with inherited soft timing and a retained why, without an invented shopping deadline.
2. Say: "Actually the expected arrival is May 22." Expect a corrected context record and adjusted inherited descriptions, while any separately explicit deadlines stay unchanged.
3. Say: "I bought all the postpartum supplies, so check all of that off. I still need to export my Amazon receipt and file it with my HSA documents." Expect only established matching purchase tasks completed, with the documentation follow-up open.
4. Establish a childcare contingency item with high priority. Then: "We've got coverage after December 24. Lower the priority; we should be okay." Expect lower priority and the remaining gap retained, not a fully completed item. Clarify the year if context does not establish it.
5. Say: "I paid off the car, but need to pick up the registration sticker in a few weeks. Should call the bank to confirm too." Expect a completed existing payoff item and two open follow-ups; no fabricated precise pickup date.
6. Say: "Anything on my list about dog Picasso?" Expect retrieval and a concise answer or clarification. No task creation from the question.
7. Capture the same message with the same API ID twice. Expect one Pi operation and one set of changes. Use the same ID with different text and expect HTTP 409.
8. Interrupt the local process during a tool round and restart. Expect Pi to resume and committed mutations to remain single. A parked run should be visible, with retry available.
9. Change an item manually while Pi holds an earlier version. Expect a conflict, followed by re-reading and reconsideration rather than overwriting the manual edit.
10. Drop an idea, then ask about it later. Expect it to remain searchable without silently reopening it.
