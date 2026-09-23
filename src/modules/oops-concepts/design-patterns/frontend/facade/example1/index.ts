// Facade (frontend) — Example 1: an API client.
// Components call api.get("/users"); everything else is hidden.

// --- The subsystem ---

class TokenStore {
  private token: string = "expired-token";
  public get(): string {
    return this.token;
  }
  public refresh(): string {
    this.token = "fresh-token";
    console.log("  [auth] token refreshed");
    return this.token;
  }
}

interface RawResponse {
  status: number;
  body: string;
}

class HttpTransport {
  private attempt: number = 0;

  public send(method: string, url: string, token: string): RawResponse {
    this.attempt++;
    console.log(`  [http] ${method} ${url} (auth: ${token})`);

    if (token === "expired-token") {
      return { status: 401, body: '{"message":"token expired"}' };
    }
    if (url === "/flaky" && this.attempt < 3) {
      return { status: 503, body: '{"message":"service unavailable"}' };
    }
    if (url === "/missing") {
      return { status: 404, body: '{"message":"not found"}' };
    }
    return { status: 200, body: '[{"id":"u1","name":"Ada"}]' };
  }
}

// A single error type the UI can actually switch on.
export class ApiError extends Error {
  constructor(
    public readonly kind: "notFound" | "offline" | "server" | "unauthorized",
    message: string,
  ) {
    super(message);
  }
}

// --- The facade ---
export class ApiClient {
  private readonly transport: HttpTransport = new HttpTransport();
  private readonly tokens: TokenStore = new TokenStore();

  public get<T>(url: string): T {
    return this.request<T>("GET", url);
  }

  private request<T>(method: string, url: string, retriesLeft: number = 3): T {
    const res: RawResponse = this.transport.send(method, url, this.tokens.get());

    // Transparent token refresh: components never see a 401.
    if (res.status === 401 && retriesLeft > 0) {
      this.tokens.refresh();
      return this.request<T>(method, url, retriesLeft - 1);
    }

    // Transparent retry on transient failures.
    if (res.status >= 500 && retriesLeft > 0) {
      console.log(`  [retry] ${res.status}, ${retriesLeft - 1} attempts left`);
      return this.request<T>(method, url, retriesLeft - 1);
    }

    if (res.status === 404) {
      throw new ApiError("notFound", "That resource does not exist");
    }
    if (res.status >= 400) {
      throw new ApiError("server", "Something went wrong on our side");
    }

    return JSON.parse(res.body) as T;
  }
}

// ---- Demo ----

const api: ApiClient = new ApiClient();

console.log("a normal call (token happens to be expired):");
console.log("  =>", api.get<{ id: string; name: string }[]>("/users"));

console.log("\na flaky endpoint:");
console.log("  =>", api.get("/flaky"));

console.log("\na 404, mapped to a typed error the UI can render:");
try {
  api.get("/missing");
} catch (err) {
  const e = err as ApiError;
  console.log(`  => kind=${e.kind} message="${e.message}"`);
}
