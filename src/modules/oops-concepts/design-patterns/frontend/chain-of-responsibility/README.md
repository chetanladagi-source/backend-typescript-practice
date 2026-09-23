# Chain of Responsibility — Frontend

Full theory, ordering rules and interview questions:
[`../../backend/chain-of-responsibility/README.md`](../../backend/chain-of-responsibility/README.md)

## Where it shows up on the frontend

- **DOM event bubbling.** A click travels up through ancestors until something calls
  `stopPropagation()`. The browser ships the pattern; you use it every day.
- Route guards in React Router / Vue Router / Angular: authenticated? has the role? onboarding
  complete? Each guard either passes the request along or redirects.
- Keyboard handling: a modal takes Escape first, and only if no modal is open does the page-level
  handler see it.
- Form validation pipelines, where the first failing rule wins.

## The frontend-specific note

Event bubbling is the example to reach for. It shows both halves of the pattern: a handler can
act and pass the event on, or act and stop the chain. The `event.stopPropagation()` decision is
literally "am I responsible for this?".

The trap worth naming is that stopping the chain too eagerly breaks unrelated features — a modal
that swallows every keystroke also kills the global Cmd+K palette.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | DOM-style event bubbling through a component tree |
| `example2` | A route guard pipeline that redirects or lets the navigation through |
