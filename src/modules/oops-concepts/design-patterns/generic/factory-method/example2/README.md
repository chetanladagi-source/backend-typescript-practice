# Example 2 — Parking tickets by stay type

**Problem:** the exit booth must price hourly, daily-flat and valet stays. An `if (stay === ...)`
at the booth grows every time a new stay type is added, and every caller that prices a ticket
duplicates it.

**Pattern:** `TicketFactory.issue(stay, plate)` returns an `HourlyTicket`, `DailyTicket` or
`ValetTicket`. The booth only calls `ticket.fee(hours)`. Adding "EV overnight" is one class plus
one `case`.

**Same pattern as the employee factory, different product.** Example 1 builds people; this one
builds tickets. The `assertNever` default is the same trick: a new `Stay` that you forget to
handle fails the build.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/factory-method/example2/index.ts`
