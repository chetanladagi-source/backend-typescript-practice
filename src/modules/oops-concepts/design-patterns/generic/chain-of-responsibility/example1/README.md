# Example 1 — Payment authorization pipeline

**Problem:** before a card is charged, several checks must run — fraud, KYC, funds, 3-D Secure —
each of which can reject the request. Written as nested `if`s it becomes a wall of code, and every
new check touches the existing ones.

**Pattern:** each check is a class with its own `check()` method. They are linked by `setNext(...)`
and the base class walks the chain, stopping at the first rejection. Adding a fifth check is one
class and one `setNext` call.

**Order matters — and it is the design, not a detail.** Cheap checks first, expensive last:

- Fraud is a local rule, no I/O — put it first.
- KYC is a lookup — after fraud.
- Funds check hits the account service.
- 3-D Secure adds user latency (a challenge screen) — always last.

Get the order wrong and you either issue a challenge to a card that would have failed fraud
anyway, or you hit the bank for a request that turns out to be trivially rejectable.

**Chain of Responsibility vs Decorator — the trap question:** the class shapes look the same
(wrap, delegate). The difference is who decides.

- **Decorator** always calls the wrapped object; it *adds* behaviour.
- **Chain of Responsibility** may *refuse* to call the next handler; the request can stop anywhere.

**Frontend cousin:** DOM event bubbling is this pattern — a click walks up the ancestor chain,
each handler running and optionally stopping propagation.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/chain-of-responsibility/example1/index.ts`
