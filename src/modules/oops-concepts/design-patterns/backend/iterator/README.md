# Iterator (Behavioral)

**Intent:** provide a way to traverse a collection's elements without exposing how the collection
stores them.

## Why it still matters in a language with `for...of`

Because `for...of` **is** this pattern, standardised. JavaScript bakes it into the language through
two protocols:

- **Iterable** — an object with a `[Symbol.iterator]()` method.
- **Iterator** — an object with `next()` returning `{ value, done }`.

Implement those and your class works with `for...of`, spread (`[...x]`), destructuring,
`Array.from`, and `Promise.all`. That is the answer to "have you used Iterator?" — you have, every
day.

## Generators

`function*` is syntax sugar that builds an iterator for you. `yield` suspends and resumes,
so you can express lazy and even infinite sequences in a few lines. Example 3 uses them.

## When to use a custom iterator

- Traversal order is non-obvious (tree walks, skipping deleted records, reverse order).
- The data is lazy or remote: paginated APIs, database cursors, huge files you cannot hold in
  memory.
- You want several traversal strategies over the same structure.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A playlist with normal, reverse, and shuffle iterators |
| `example2` | A paginated API iterator that fetches lazily |
| `example3` | Generators: log chunking, a BST in-order walk, and an infinite ID sequence |

## Interview questions

- **Iterable vs Iterator?** An iterable *can produce* an iterator (`[Symbol.iterator]()`); an
  iterator *is* the cursor (`next()`). Most iterators are also iterable by returning `this`, which
  is why `for...of` works on them directly.
- **Why not just return the array?** It copies (memory), it is eager (you cannot stream), and it
  leaks your internal representation so you can never change it.
- **External vs internal iteration?** External: the client drives (`for...of`, `next()`).
  Internal: the collection drives (`forEach`). External gives you early exit and laziness.
- **How do generators help?** They make lazy and infinite sequences trivial, and they let you write
  a tree traversal recursively with `yield*`.
