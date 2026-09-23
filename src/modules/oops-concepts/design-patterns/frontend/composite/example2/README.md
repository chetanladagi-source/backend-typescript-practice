# Example 2 — Nested navigation menu

**Problem:** the sidebar is an arbitrarily nested tree, and items are role-gated. Filtering it for
the current user has to recurse, and the gating rules differ between a link and a whole section.

**Pattern:** `MenuLink` (leaf) and `MenuGroup` (composite) both implement `MenuNode`.
`visibleFor(roles)` returns a **filtered copy** rather than mutating, so the source menu stays
intact and can be re-filtered when the user's roles change.

**The detail that makes it real:** a group whose children were all filtered out returns
`undefined` and disappears. Without that, a viewer would see an "Admin" dropdown that opens to
nothing — the classic bug when permission filtering is done with a flat `.filter()` instead of
recursively. Watch the plain-viewer output: "Moderation" and "Admin" vanish entirely, while
"Content" survives because `Posts` is public.

**Worth noting:** returning a new tree instead of mutating is also what makes this safe to use as
derived state in React.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/composite/example2/index.ts`
