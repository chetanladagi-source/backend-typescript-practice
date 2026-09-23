# Example 3 — Auction house

**Problem:** bidders need to react to each other's bids, but they must not hold references to each
other (and must not be able to read each other's budgets).

**Pattern:** `AuctionHouse` validates every bid and broadcasts the result. `AutoBidder` responds by
bidding again — but through the mediator, never directly at another bidder.

**The interesting bit is the recursion:** one opening bid from Ada triggers a cascade as the two
auto-bidders outbid each other through `placeBid` until they hit their budgets. That is real
many-to-many coordination, and it works because a single object owns the rules.

**This is also the trap:** cascading updates through a mediator are hard to trace and easy to turn
into an infinite loop. Here the budget ceilings terminate it. In production you would add an
explicit depth or iteration limit rather than trusting the data to stop the cascade.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/mediator/example3/index.ts`
