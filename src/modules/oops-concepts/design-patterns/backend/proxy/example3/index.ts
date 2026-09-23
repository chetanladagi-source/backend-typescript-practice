// Proxy — Example 3: caching proxy with a TTL.
// The rate API is slow and rate-limited, so repeated lookups should not reach it.

export interface RateApi {
  getRate(pair: string): number;
}

class HttpRateApi implements RateApi {
  private requestCount: number = 0;

  public getRate(pair: string): number {
    this.requestCount++;
    console.log(`  [http] GET /rates/${pair} (request #${this.requestCount})`);
    return pair === "USD-INR" ? 83.25 : 1.0;
  }
}

interface CacheEntry {
  value: number;
  expiresAt: number;
}

class CachingRateApi implements RateApi {
  private readonly cache: Map<string, CacheEntry> = new Map<string, CacheEntry>();

  constructor(
    private readonly real: RateApi,
    private readonly ttlMs: number,
    private now: () => number = (): number => Date.now(),
  ) {}

  public getRate(pair: string): number {
    const entry: CacheEntry | undefined = this.cache.get(pair);
    if (entry !== undefined && entry.expiresAt > this.now()) {
      console.log(`  [cache] hit for ${pair}`);
      return entry.value;
    }
    if (entry !== undefined) {
      console.log(`  [cache] expired for ${pair}`);
    }
    const value: number = this.real.getRate(pair);
    this.cache.set(pair, { value, expiresAt: this.now() + this.ttlMs });
    return value;
  }

  // Injected clock so the demo (and tests) can jump forward without waiting.
  public advanceClockBy(ms: number): void {
    const base: number = this.now();
    this.now = (): number => base + ms;
  }
}

// ---- Demo ----

const rates: CachingRateApi = new CachingRateApi(new HttpRateApi(), 60_000);

console.log("=>", rates.getRate("USD-INR")); // miss
console.log("=>", rates.getRate("USD-INR")); // hit
console.log("=>", rates.getRate("EUR-INR")); // miss, different key

console.log("--- 61 seconds later ---");
rates.advanceClockBy(61_000);
console.log("=>", rates.getRate("USD-INR")); // expired, refetches
