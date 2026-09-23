# Command (Behavioral)

**Intent:** turn a request into a standalone object. Once an action is an object rather than a
method call, you can store it, queue it, log it, retry it, and undo it.

## What becoming an object unlocks

| Capability | How |
| --- | --- |
| **Undo/redo** | Give the command an `undo()` alongside `execute()` |
| **Queueing** | Push commands onto a list and run them later or elsewhere |
| **Logging/audit** | Every command describes itself |
| **Retry** | Keep the object and call `execute()` again |
| **Macro** | A command that holds a list of other commands |

You cannot do any of that with a bare method call.

## Structure

1. **Command** — interface with `execute()`, often `undo()`.
2. **Concrete command** — holds the receiver plus the arguments it will need.
3. **Receiver** — the object that does the real work.
4. **Invoker** — triggers commands and usually owns the history.

## When to use

- Undo/redo is a requirement.
- Work should be queued, scheduled, or retried (a job queue is Command).
- You need an audit trail of who did what.

## When NOT to use

- Simple actions with no undo, queue, or audit requirement. Wrapping every method call in a class
  is over-engineering, and interviewers will say so.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Undoable edits to a record, with undo/redo stacks |
| `example2` | A job queue of retryable commands |
| `example3` | Deployment steps with automatic rollback, including a macro command |

## Interview questions

- **How do you implement undo?** Either store the inverse operation, or snapshot the previous
  value before executing. Example 1 snapshots — which is Command combined with Memento.
- **Command vs Strategy?** Strategy is *how* to do something (swappable algorithm); Command is
  *what* to do, captured with its arguments, for later.
- **Real examples?** Redux actions, database transaction logs, CI pipeline steps, BullMQ jobs,
  every editor's undo stack.
