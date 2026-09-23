# Factory Method — Frontend

Full theory, trade-offs and interview questions: [`../../backend/factory-method/README.md`](../../backend/factory-method/README.md)

## Where it shows up on the frontend

- **Dynamic form renderers** — a JSON schema says `"type": "select"` and something must decide
  which component renders it. This is the single most common frontend use.
- `React.createElement` / `document.createElement` / `h()` in Vue.
- Toast and modal helpers: `toast.success(...)`, `toast.error(...)`.
- Chart libraries picking a series renderer from `type: "bar" | "line"`.

## The frontend-specific note

A component registry (`Record<string, Component>`) beats a `switch` here for the same reason it
does on the server, but the payoff is bigger: feature teams can register their own field types
without editing the shared renderer, and the registry can be code-split so unused field types are
never downloaded.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A schema-driven form renderer picking a field component |
| `example2` | A toast factory that varies icon, timeout, and priority by severity |
