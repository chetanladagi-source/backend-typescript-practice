# Example 3 — Compressing and encrypting writer

**Problem:** data should be compressed and encrypted before hitting disk, but `FileWriter` should
stay a dumb writer.

**Pattern:** the original GoF stream example. Both decorators implement `DataWriter`, transform the
payload, and hand it to `inner`.

**Read the nesting outside-in.** `new CompressingWriter(new EncryptingWriter(new FileWriter()))`
compresses *first*, because the outermost wrapper is the one whose `write()` you call. Getting this
backwards is the easiest mistake to make with decorators.

**Why order matters here concretely:** the demo runs both orders and prints the sizes.
Compressing first takes the payload 34 → 22 chars, and encrypting that gives 32. Encrypting first
produces high-entropy base64 that run-length compression cannot shrink at all: 48 → 48. Same two
classes, measurably worse result — this is the best short answer to "why does decorator order
matter?".

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/decorator/example3/index.ts`
