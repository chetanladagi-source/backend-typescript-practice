# Example 1 — API client facade

**Problem:** every component that calls `fetch` has to attach the auth header, handle a 401 by
refreshing the token and retrying, retry 5xx responses, parse JSON, and turn HTTP status codes into
something renderable. Copy-pasted 40 times, it is inconsistent 40 different ways.

**Pattern:** `api.get<T>(url)`. Token refresh, retry, and error mapping happen inside.

**The two behaviours worth pointing at:**

- **401 → refresh → replay.** The first demo call starts with an expired token and still returns
  data. Components never see a 401, which means no component needs to know the auth scheme exists.
- **HTTP statuses become a typed `ApiError` union.** The UI switches on `kind` (`"notFound"`,
  `"offline"`, `"server"`) rather than on magic numbers, so `404` never leaks into a component.
  This is the same anti-corruption idea as the Adapter examples, applied to errors.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/facade/example1/index.ts`
