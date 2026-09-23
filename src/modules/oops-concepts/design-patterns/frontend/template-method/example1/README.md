# Example 1 — A list-view base class

**Problem:** every list screen repeats the same skeleton — heading, loading, error, empty state,
then the rows. Copy it per screen and one of them inevitably forgets the empty state and renders a
blank page.

**Pattern:** `ListView.render()` is the template method. It fixes the order of steps and calls
abstract methods (`title`, `load`, `renderItem`) that each screen must supply, plus **hook methods**
(`renderEmpty`, `renderError`, `renderToolbar`) that already have defaults.

**The hook-method distinction is the thing to name in an interview.** `NotificationListView`
overrides nothing optional and still gets a correct empty state and error state for free.
`OrderListView` overrides two hooks because it wants a summary bar and a call-to-action empty
state. Required steps force a decision; hooks let you skip one.

**`renderError` proves the skeleton is worth having:** `NotificationListView.load()` throws, and the
screen still renders its heading and a readable message rather than blowing up. That behaviour was
written once.

**The trade-off to volunteer:** this is inheritance, so a screen gets exactly one parent. If it also
needs infinite scroll and selection, you either bloat the base class or start a hierarchy. That is
why React moved to custom hooks — see example 2 for the same idea without inheritance.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/template-method/example1/index.ts`
