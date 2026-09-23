# Example 1 — Rich-text document, four exports

**Problem:** an editor's document tree needs to become HTML for the page, markdown for the export
button, plain text for the search index, and a word count for the status bar. Putting
`toHtml()`, `toMarkdown()`, `toPlainText()` and `countWords()` on every node class means four
methods × four node types, and the next format makes it twenty.

**Pattern:** the node classes expose one method, `accept(visitor)`. Each export is a separate
visitor class. Adding a fifth format touches **zero** node classes.

**The double dispatch is the mechanic to be able to explain.** `doc.accept(v)` first dispatches on
the node's runtime type (that is `Paragraph.accept` calling `visitor.paragraph`), then on the
visitor's type (which `paragraph` implementation runs). Two dynamic dispatches, hence the name.
Languages with multiple dispatch do not need the pattern at all.

**Notice `WordCountVisitor` returns a number.** `DocVisitor<R>` is generic, so a visitor is not
limited to serialisation — collecting, counting, and validating are all the same shape. That
generic return type is what makes the pattern feel less like boilerplate.

**Notice also that each visitor decides differently about images:** HTML emits a tag, markdown emits
its own syntax, plain text emits nothing, and the counter contributes 0. In an
"add a `render()` to every node" design, that decision would be scattered across four classes.

**The cost, which you should raise before the interviewer does:** adding a `TableNode` means editing
`DocVisitor` and all four visitors. This trade is only worth it when node kinds are stable and
operations keep arriving — true for document trees, false for a domain still being designed.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/visitor/example1/index.ts`
