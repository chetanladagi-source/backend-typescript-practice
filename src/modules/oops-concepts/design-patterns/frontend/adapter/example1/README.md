# Example 1 — API payloads to a view model

**Problem:** v1 returns `snake_case` with `is_act: 1` and a comma-separated role string; v2 returns
nested objects and a status enum. Letting either shape reach your components means the whole UI is
coupled to a payload you do not control.

**Pattern:** one adapter per API version, both producing `UserViewModel`. This is the
**anti-corruption layer**, and it is probably the highest-value pattern in everyday frontend work.

**Look at what the adapter absorbs**, because this is the real argument for it:

| API habit | Fixed in the adapter |
| --- | --- |
| `user_id` as a number | `String(...)`, so ids are uniform |
| `is_act: 0 \| 1` | a real `boolean` |
| `created` as an ISO string | a `Date` |
| `role_csv: null` | `[]`, so `.map()` never crashes |

**The migration payoff:** the last lines feed both versions into the same list. During a v1→v2
rollout you can serve mixed data with zero component changes, then delete `V1UserAdapter` when the
migration completes.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/adapter/example1/index.ts`
