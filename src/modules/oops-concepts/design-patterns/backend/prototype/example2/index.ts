// Prototype — Example 2: a registry of pre-configured request presets.
// Callers ask the registry for "authedJson", get their own copy, and tweak it.

export class ApiRequest {
  constructor(
    public url: string,
    public method: string,
    public headers: Record<string, string>,
    public timeoutMs: number,
  ) {}

  public clone(): ApiRequest {
    return new ApiRequest(this.url, this.method, { ...this.headers }, this.timeoutMs);
  }

  public describe(): string {
    return `${this.method} ${this.url} timeout=${this.timeoutMs} headers=${JSON.stringify(this.headers)}`;
  }
}

// The registry stores fully-built prototypes, never handing out the original.
class RequestRegistry {
  private readonly prototypes: Map<string, ApiRequest> = new Map<string, ApiRequest>();

  public register(key: string, prototype: ApiRequest): void {
    this.prototypes.set(key, prototype);
  }

  public create(key: string): ApiRequest {
    const prototype: ApiRequest | undefined = this.prototypes.get(key);
    if (prototype === undefined) {
      throw new Error(`No preset named "${key}"`);
    }
    return prototype.clone();
  }
}

// ---- Demo ----

const registry: RequestRegistry = new RequestRegistry();

registry.register(
  "authedJson",
  new ApiRequest("", "GET", { Accept: "application/json", Authorization: "Bearer TOKEN" }, 5000),
);
registry.register("upload", new ApiRequest("", "POST", { "Content-Type": "multipart/form-data" }, 60_000));

const fetchUsers: ApiRequest = registry.create("authedJson");
fetchUsers.url = "/api/users";
console.log(fetchUsers.describe());

const fetchOrders: ApiRequest = registry.create("authedJson");
fetchOrders.url = "/api/orders";
fetchOrders.timeoutMs = 15_000;
console.log(fetchOrders.describe());

// Each caller got an independent copy; the stored preset is still pristine.
console.log("presets independent?", fetchUsers.timeoutMs !== fetchOrders.timeoutMs); // true
console.log(registry.create("upload").describe());
