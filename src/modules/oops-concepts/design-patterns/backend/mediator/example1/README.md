# Example 1 — Chat room

**Problem:** if every user held references to every other user, joining would mean updating
everyone, and rules like banning or direct messages would be duplicated in each participant.

**Pattern:** `ChatRoom` is the mediator. Users only know `say()`. Broadcast, direct messaging, and
the ban list all live in `send()`.

**What this buys you concretely:** `Bot` is a participant like any other — it receives messages and
can reply, and the mediator has no idea it is special. Adding moderation, message history, or rate
limiting means editing one method rather than every participant class.

**And the honest downside:** `ChatRoom.send()` is already doing three jobs after only a handful of
features. This is exactly how a mediator drifts toward a God Object, which is the criticism to
raise yourself in an interview.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/mediator/example1/index.ts`
