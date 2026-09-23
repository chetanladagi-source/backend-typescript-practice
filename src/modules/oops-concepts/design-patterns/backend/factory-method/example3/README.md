# Example 3 — Upload parser via a registry

**Problem:** a `switch` factory has to be edited every time a format is added, which means the
factory file is touched by every team and is a merge-conflict magnet.

**Pattern:** a `Map<string, () => Parser>`. Adding XML is a `registerParser("xml", ...)` call from
the XML module itself — `createParser` never changes.

**Takeaway:** this is the plugin-friendly variant of Factory Method and the answer to "how do you
make a factory Open/Closed?". The cost is that unknown types fail at runtime instead of compile
time, so the `throw` for an unregistered type matters.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/factory-method/example3/index.ts`
