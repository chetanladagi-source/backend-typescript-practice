# Example 2 — Icon sprite registry

**Problem:** a feed renders the same few icons thousands of times at different sizes and colours.
Holding the SVG path data per occurrence is wasteful, and re-parsing it on every virtualised scroll
render is worse.

**Pattern:** `IconRegistry` pools one `IconSprite` per icon name. Five rows using three distinct
icons parse three sprites — watch the `[registry] parsing sprite` lines appear exactly once each.

**This is the purest of the two flyweight examples**, because `renderAt(sizePx, color, label)`
takes the extrinsic state as **method arguments** and never stores it. In example 1 the extrinsic
state still lived on a `Cell`; here it does not exist between calls at all. That is the textbook
form.

**Mapping the vocabulary:** path data and viewBox are **intrinsic** (identical wherever the icon
appears); size, colour, and label are **extrinsic** (different at every call site). Being able to
split your own example that way is the whole interview question.

**Real-world equivalent:** an SVG sprite sheet — one `<symbol>` in the document, thousands of
`<use href="#check">` references. Same pattern, implemented by the browser.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/flyweight/example2/index.ts`
