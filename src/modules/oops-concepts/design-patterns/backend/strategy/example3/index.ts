// Strategy — Example 3: retry backoff, written the idiomatic TypeScript way.
// A single-method interface is just a function type; no classes needed.

export type BackoffStrategy = (attempt: number) => number;

const fixed = (delayMs: number): BackoffStrategy => {
  return (): number => delayMs;
};

const linear = (stepMs: number): BackoffStrategy => {
  return (attempt: number): number => attempt * stepMs;
};

const exponential = (baseMs: number): BackoffStrategy => {
  return (attempt: number): number => baseMs * 2 ** (attempt - 1);
};

// Exponential with jitter: what you actually want in production, because
// plain exponential backoff makes every client retry in lockstep.
const exponentialWithJitter = (baseMs: number, random: () => number = Math.random): BackoffStrategy => {
  return (attempt: number): number => Math.round(baseMs * 2 ** (attempt - 1) * (0.5 + random() * 0.5));
};

// A registry replaces the factory class.
const strategies: Record<string, BackoffStrategy> = {
  fixed: fixed(100),
  linear: linear(100),
  exponential: exponential(100),
  jittered: exponentialWithJitter(100, (): number => 0.7), // fixed "random" so output is stable
};

// Context: takes the strategy as a parameter.
function retry<T>(operation: () => T, attempts: number, backoff: BackoffStrategy): T {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return operation();
    } catch (err) {
      if (attempt === attempts) {
        throw err;
      }
      console.log(`  attempt ${attempt} failed, waiting ${backoff(attempt)}ms`);
    }
  }
  throw new Error("unreachable");
}

// ---- Demo ----

Object.entries(strategies).forEach(([name, backoff]: [string, BackoffStrategy]): void => {
  console.log(`${name}: ${[1, 2, 3, 4].map(backoff).join("ms, ")}ms`);
});

console.log("--- retrying a flaky call with exponential backoff ---");
let calls: number = 0;
const flaky = (): string => {
  calls++;
  if (calls < 3) {
    throw new Error("503 Service Unavailable");
  }
  return "succeeded on call " + calls;
};

console.log("=>", retry(flaky, 5, strategies.exponential));
