# Example 1 — Light and dark theme kits

**Problem:** theming by passing a `theme` string means every component branches on it, and the one
component whose author forgot the dark branch stays blinding white in dark mode.

**Pattern:** `ThemeKit` creates the button, input, and card. `LightTheme` and `DarkTheme` each
return their own matched set, and `renderLoginScreen()` is written once against the interfaces.

**The guarantee is the point:** a screen with a dark card and a light button is not a bug you have
to catch in review — it is unconstructable, because every component comes from one kit.

**How this maps to React:** `useTheme()` here is a stand-in for `useContext(ThemeContext)`, and
swapping `activeTheme` is what a `ThemeProvider` does. Recognising that a `ThemeProvider` *is* an
abstract factory delivered through context is the answer that lands in an interview.

**And the trade-off:** adding a fourth component type (say a `Modal`) means editing `ThemeKit` and
both themes. New families are cheap; new product types are expensive.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/abstract-factory/example1/index.ts`
