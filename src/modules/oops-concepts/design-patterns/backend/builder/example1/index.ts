// Builder — Example 1: a fluent HTTP request builder.
// Replaces a constructor with eight mostly-optional arguments.

type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface HttpRequest {
  readonly method: Method;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body?: string;
  readonly timeoutMs: number;
}

class HttpRequestBuilder {
  private method: Method = "GET";
  private url: string = "";
  private headers: Record<string, string> = {};
  private body?: string;
  private timeoutMs: number = 5000;

  // Every setter returns `this`, which is what makes the chain work.
  public withMethod(method: Method): this {
    this.method = method;
    return this;
  }

  public withUrl(url: string): this {
    this.url = url;
    return this;
  }

  public withHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  public withJsonBody(payload: unknown): this {
    this.body = JSON.stringify(payload);
    this.headers["Content-Type"] = "application/json";
    return this;
  }

  public withTimeout(ms: number): this {
    this.timeoutMs = ms;
    return this;
  }

  // Validation that spans several fields belongs here, not in a setter.
  public build(): HttpRequest {
    if (this.url === "") {
      throw new Error("url is required");
    }
    if (this.method === "GET" && this.body !== undefined) {
      throw new Error("GET requests cannot have a body");
    }
    return {
      method: this.method,
      url: this.url,
      headers: { ...this.headers },
      body: this.body,
      timeoutMs: this.timeoutMs,
    };
  }
}

// ---- Demo ----

const getUsers: HttpRequest = new HttpRequestBuilder()
  .withUrl("https://api.example.com/users")
  .withHeader("Accept", "application/json")
  .build();

console.log("GET:", getUsers);

const createUser: HttpRequest = new HttpRequestBuilder()
  .withMethod("POST")
  .withUrl("https://api.example.com/users")
  .withHeader("Authorization", "Bearer token-123")
  .withJsonBody({ name: "ada", role: "admin" })
  .withTimeout(10_000)
  .build();

console.log("POST:", createUser);

try {
  new HttpRequestBuilder().withUrl("/x").withJsonBody({ a: 1 }).build();
} catch (err) {
  console.log("caught at build():", (err as Error).message);
}
