# Chain of Responsibility (Behavioral)

**Intent:** pass a request along a chain of handlers. Each handler either deals with it or forwards
it to the next one, so the sender never knows which handler will respond.

## Two flavours (know both)

- **Pure chain** — exactly one handler deals with the request and the chain stops. Escalation and
  approval flows work this way (example 2).
- **Pipeline** — every handler does a bit of work and passes the request on; any handler can
  short-circuit. This is Express/Koa middleware (example 1), and it is by far the more common form
  in backend code.

## Structure

1. A **handler** interface with `handle(request)` and a link to the next handler.
2. A base class holding `next` and a `setNext()` that returns the next handler so the chain reads
   fluently.
3. Concrete handlers decide: handle, forward, or reject.

## When to use

- A request needs several independent checks or transformations, and the set or order changes.
- Escalation rules: approve under X, else escalate.
- You want to add or reorder steps by editing configuration rather than an `if` block.

## Trade-offs

- **A request can fall off the end unhandled.** Always decide what that means and make it explicit.
- Debugging is harder: the flow is spread across classes and wiring order, not visible in one
  function.
- A long chain is a long chain — every request pays for every handler.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Express-style middleware pipeline: auth, validate, rate-limit, handle |
| `example2` | Expense approval escalating by amount |
| `example3` | Support ticket triage with a fallback handler |

## Interview questions

- **Chain of Responsibility vs Decorator?** Both wrap and delegate. A decorator *always* calls the
  next layer and returns a value of the same type; a chain handler *may stop* and never forward.
  Intent: add behaviour vs find the right handler.
- **What if nothing handles it?** Your design decision: throw, return a default, or add an explicit
  catch-all handler at the end. Example 3 uses a catch-all.
- **Real examples?** Express/Koa middleware, servlet filters, logging-level handlers, DOM event
  bubbling, NestJS guards and interceptors.
