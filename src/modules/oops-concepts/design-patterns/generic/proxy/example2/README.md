# Example 2 — Lazy ANPR camera

**Problem:** starting the plate camera is slow. Creating it at lot-open wastes work if the first
car is hours away. Creating it in every caller duplicates the lazy-init logic.

**Pattern:** `LazyPlateReader` implements `PlateReader` and constructs `AnprCamera` on first
`read()`. `bootCount()` stays 1 across three reads.

**This is a virtual proxy**, not the protection proxy from example 1. Same shape (same interface
as the real object), different reason (defer cost, not guard access). Worth naming both kinds in
an interview.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/proxy/example2/index.ts`
