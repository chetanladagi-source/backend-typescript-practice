// Decorator — Example 1: an HTTP client wrapped with logging, retry and caching.
// Every wrapper implements HttpClient, so they stack in any order.

export interface HttpClient {
  get(url: string): string;
}

// The real thing. Fails the first two times to give retry something to do.
class RealHttpClient implements HttpClient {
  private calls: number = 0;

  public get(url: string): string {
    this.calls++;
    if (this.calls < 3) {
      throw new Error("ECONNRESET");
    }
    return `{"url":"${url}","ok":true}`;
  }
}

// Base decorator: holds the wrapped client and delegates by default.
abstract class HttpClientDecorator implements HttpClient {
  constructor(protected readonly inner: HttpClient) {}

  public get(url: string): string {
    return this.inner.get(url);
  }
}

class LoggingClient extends HttpClientDecorator {
  public get(url: string): string {
    console.log(`  [log] GET ${url}`);
    const body: string = super.get(url);
    console.log(`  [log] <- ${body}`);
    return body;
  }
}

class RetryingClient extends HttpClientDecorator {
  constructor(inner: HttpClient, private readonly attempts: number = 3) {
    super(inner);
  }

  public get(url: string): string {
    let lastError: Error = new Error("never ran");
    for (let i = 1; i <= this.attempts; i++) {
      try {
        return super.get(url);
      } catch (err) {
        lastError = err as Error;
        console.log(`  [retry] attempt ${i} failed: ${lastError.message}`);
      }
    }
    throw lastError;
  }
}

class CachingClient extends HttpClientDecorator {
  private readonly cache: Map<string, string> = new Map<string, string>();

  public get(url: string): string {
    const hit: string | undefined = this.cache.get(url);
    if (hit !== undefined) {
      console.log("  [cache] hit");
      return hit;
    }
    const body: string = super.get(url);
    this.cache.set(url, body);
    return body;
  }
}

// ---- Demo ----

// Read it outside-in: cache first, then log, then retry, then the network.
const client: HttpClient = new CachingClient(new LoggingClient(new RetryingClient(new RealHttpClient())));

console.log("first call (cold, will retry):");
console.log("=>", client.get("/api/users"));

console.log("second call (served from cache, no log, no network):");
console.log("=>", client.get("/api/users"));

// Order matters: here the cache sits *inside* retry, so a cache hit never reaches the retry logic.
console.log("plain client, no decorators:");
console.log("=>", new CachingClient(new RealHttpClient()) instanceof CachingClient);
