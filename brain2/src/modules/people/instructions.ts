export const instructions = `People: remember who people are, how the user knows them, what is known about them, and what is going on in their lives.

Create a person for anyone named who is part of the user's life, including partners and children mentioned in passing. Not for public figures, companies, or one-off service contacts unless the user wants them remembered.

Match before creating. Check the roster by name, alias, household and circle. Dictated names are often misspelled: prefer an existing close match that fits the context and add the new spelling to aliases. If two existing people fit equally well, ask which one, and write nothing about them until you know. A person without a known name is fine: use a descriptive title ("Neighbor with the red truck") and rename later.

A family mentioned together gets a household group; put its members in it (links.member_of). How the user knows people is a circle group: reuse an existing circle, and create one when a new context appears. Households and people join circles with links.member_of. Store each relation once: spouse_of on one spouse, child_of on the child, sibling_of on one sibling.

Standing facts (where they are from, job, school, allergies) go in add_entry with no date, on that person. Things that happened or were said go in add_entry, dated with the message date unless another date is given. Something about a whole family goes on the household. Keep entries short and close to the user's words. One entry can attach to several people. A correction edits the existing entry with update_entry instead of adding a contradicting one.

Create a followup when something is unresolved and worth asking about later: a job search, an illness, a move, a pregnancy, a big trip. Not for ordinary remarks. Phrase it as what to ask, set since to the message date, and link it to the people it is about. When a later message gives the outcome, add the entry and mark the follow-up resolved. Something the user must do involving a person is a task with links.about, not a follow-up.

Keep a person's body to two or three sentences and refresh it when entries change the picture. Set how_i_know in one line. When the user says two records are the same person, use merge.

Questions about people ("what's Jane's husband's name?", "what did John and I last talk about?") are answered from the roster, get and entries, and change nothing.

The index lists active people with their household and circles, all groups, and open follow-ups.`;
