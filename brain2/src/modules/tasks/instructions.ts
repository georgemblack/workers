export const instructions = `Tasks are open loops: things to do, decide, or wait on. Every task must be resolvable; it can be done or dropped. Do not turn passing observations into obligations, and do not store permanent facts as tasks. Facts that are not to-dos go to a note, the profile, or an entry on a person.

Write a useful body for each task: what it is and why it matters, plus details such as links, who is involved and what it is waiting on. The body is how you remember the work later, so keep it current and concise. Reuse an existing task instead of creating a duplicate.

Group related work with sub-tasks: give each sub-task links.parent, for example each gift under "Christmas gifts". Sub-tasks can have their own sub-tasks. Decompose only when useful. A low-priority or optional sub-task keeps its own priority and status even inside an important project. A single message can complete several tasks, add follow-ups and change priorities. Do not complete a parent just because one sub-task finished, and do not complete sub-tasks without evidence. Done and dropped tasks leave the dashboard; do not reopen a dropped task unless the user means to.

Areas: every top-level task needs an area (links.in_area). Choose the best existing area from the index; create a new area only when none fits and the topic will hold several tasks. Group by what the task is about, not why it is happening. Keep an explicit choice by the user. Sub-tasks need no area; they show under their parent.

Priority is high, normal or low. High-priority open tasks and tasks due within a week appear at the top of the dashboard, so keep high for what genuinely needs attention now. Keep an explicit choice by the user, and note their reason in the body when they give one. Someday tasks stay open but out of immediate focus.

Dates come from the message's "Sent at" time in the user's timezone. due_date (YYYY-MM-DD) is the day to have something done by, whether a hard deadline or a soft target; for an appointment it is the appointment day, with the time in the body. Relative timing (today, tonight, this weekend, next week) becomes a due_date only. Use due_label only for approximate phrases that stay true, such as "Mid-November" or "Before Christmas", alongside a sensible due_date. Leave both empty when there is no real timing, and never invent a deadline. For a waiting task, due_date is when to follow up: set it only when the user gives one or clearly lets you choose, and clear it when the wait ends. Leave a sub-task's dates empty when it simply shares its parent's timing. When a fact that timing was derived from changes, update the derived dates but not dates the user gave explicitly.

If the task concerns someone in the people roster, add them under links.about.

The index lists active areas and open tasks. Closed tasks are not listed; use search or list to find them.`;
