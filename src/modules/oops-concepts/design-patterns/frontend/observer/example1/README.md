# Example 1 — A store with selector subscriptions

**Problem:** the naive Observer store notifies *every* subscriber on *every* change, so toggling the
theme re-renders the cart badge. Correct, but it is why hand-rolled contexts get slow.

**Pattern:** `subscribe(label, selector, listener)`. The store remembers each subscriber's last
selected value and only notifies when `Object.is` says that slice changed.

**Read the demo output — each line proves one behaviour:**

| Action | Who re-renders | Why |
| --- | --- | --- |
| `cartCount: 1` | CartBadge only | the others selected different slices |
| `theme: "dark"` | nobody | no subscriber selected `theme` |
| upgrade to pro | UpgradeBanner, ProfileCard | the banner's boolean flipped; `user` is a new object |
| `cartCount: 1` again | nobody | `Object.is` sees no change |
| same user, new object literal | ProfileCard only | nothing changed — only the *reference* did |

**The two things worth saying out loud in an interview:**

- **Header does not re-render on upgrade.** It selects `s.user.name`, a string, and `"Ada" === "Ada"`
  even though the parent object was replaced. Selecting a primitive gives you change detection for
  free.
- **ProfileCard re-renders when nothing changed.** It selects `s.user`, an object, so a fresh
  literal with identical contents is a new reference and `Object.is` reports a change. This is the
  classic wasted render, and it is why Zustand ships a `shallow` comparator and Reselect exists —
  either select narrowly, or supply a custom equality function.

**This is `useSyncExternalStore`'s job** in React: subscribe, select a slice, re-render on change.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/observer/example1/index.ts`
