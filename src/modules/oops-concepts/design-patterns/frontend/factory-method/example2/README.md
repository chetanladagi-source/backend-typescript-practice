# Example 2 — Toast factory

**Problem:** a toast is not just a colour. Severity decides the icon, the auto-dismiss timeout, and
the ARIA live-region politeness. Scattering those rules across call sites guarantees inconsistency.

**Pattern:** one class per severity, and `createToast(severity)` as the factory. The `toast.success
/ .info / .error` object on top is the ergonomic API that libraries like `react-hot-toast` expose —
worth recognising that the helper you call every day is a factory method.

**The accessibility detail is the interesting one:** errors use `timeoutMs: null` and
`aria-live="assertive"` so they interrupt a screen reader and never vanish before being read, while
successes are `polite` and auto-dismiss. Encoding a11y rules in the factory means you cannot forget
them at a call site.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/factory-method/example2/index.ts`
