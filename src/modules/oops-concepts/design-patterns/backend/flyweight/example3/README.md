# Example 3 — Emoji glyphs in chat

**Problem:** a chat client renders the same `:rocket:` sprite thousands of times. Loading the image
bytes per occurrence is absurd.

**Pattern:** `EmojiFactory` pools one `EmojiGlyph` per shortcode. Five usages across three messages
load exactly two sprites — watch the `[factory] loading sprite` lines.

**Why this is the purest of the three examples:** `renderAt(x, y, sizePx)` takes the extrinsic
state as **method arguments** instead of storing it anywhere. In examples 1 and 2 the extrinsic
state still lived on a context object; here it never gets stored at all, which is the textbook form
GoF describes.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/flyweight/example3/index.ts`
