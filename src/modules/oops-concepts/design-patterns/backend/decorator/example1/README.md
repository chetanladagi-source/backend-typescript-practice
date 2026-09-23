# Example 1 — HTTP client decorators

**Problem:** you want logging, retry, and caching on an HTTP client. As subclasses that is eight
classes for three features.

**Pattern:** three decorators, each implementing `HttpClient` and delegating to `inner`.
`new CachingClient(new LoggingClient(new RetryingClient(new RealHttpClient())))` composes all
three at runtime.

**Read the output carefully:** the first call retries twice before succeeding; the second call
prints only `[cache] hit` because caching is the *outermost* layer, so the request never reaches
logging or retry. Flip the nesting order and the behaviour changes — that is the trade-off to be
able to explain.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/decorator/example1/index.ts`
