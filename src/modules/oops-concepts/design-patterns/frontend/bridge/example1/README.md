# Example 1 — Notification kinds × surfaces

**Problem:** product wants validation errors inline *and* as toasts, upgrade prompts as banners
*and* as modals, delete confirmations as modals. Modelled with inheritance that is
`ValidationInline`, `ValidationToast`, `UpgradeBanner`, `UpgradeModal`... 4 × 4 = 16 components,
and a fifth surface adds four more.

**Pattern:** `Notification` (the message and its actions) holds a `Surface` (where and how it
appears). 4 + 4 = 8 classes cover all 16 combinations.

**The proof is the last block:** `PushSurface` is added as a single class and every existing
notification kind works with it immediately — no edits anywhere else.

**One nice detail:** `InlineSurface.present` ignores the `actions` argument, because an inline field
message should not render buttons. Implementors are allowed to interpret the abstraction's intent
differently for their medium; that is the flexibility Bridge buys.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/bridge/example1/index.ts`
