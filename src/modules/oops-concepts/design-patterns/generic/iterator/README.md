# Iterator — Generic

Full theory, laziness and interview questions:
[`../../backend/iterator/README.md`](../../backend/iterator/README.md)

The classic framing: an `OrgChart` needs to be traversable — for headcount, salary reports, and
"find all engineers". Each traversal on its own is easy; giving them a shared `for...of` interface
is what the pattern does.

| Example | Scenario |
| --- | --- |
| `example1` | Iterating over an org chart with `Symbol.iterator` and a generator |
| `example2` | A garage with `free()` and `evOnly()` traversals over the same spots |
