# Abstract Factory — Frontend

Full theory, the Factory-Method comparison and interview questions:
[`../../backend/abstract-factory/README.md`](../../backend/abstract-factory/README.md)

## Where it shows up on the frontend

- **Theming.** Light and dark are families: button, input, and card must all come from the same
  theme or the UI looks broken. This is the GoF book's original motivating example (it used
  Motif vs Presentation Manager widgets) and it is still the clearest one.
- **Cross-platform design systems** — the same component API rendering to web, React Native, or
  email HTML.
- White-label apps where each tenant gets a full component family.

## The frontend-specific note

React Context is how this is usually delivered in practice: a `ThemeProvider` puts the concrete
factory at the top of the tree, and `useTheme()` is the lookup. The pattern is the same, the
plumbing is just context instead of a constructor argument.

**Why it beats passing a `theme` string around:** with a string, every component has to branch on
it, and one component that forgets stays light in dark mode. With a factory, mismatched components
are impossible to construct.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Light and dark theme kits: button, input, and card |
| `example2` | One design system rendering to web HTML or email-safe HTML |
