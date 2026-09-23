// Strategy — Example 2: authentication strategies.
// This is literally how Passport.js is designed.

export interface AuthResult {
  ok: boolean;
  userId?: string;
  reason?: string;
}

export interface AuthStrategy {
  readonly name: string;
  authenticate(headers: Record<string, string>): AuthResult;
}

class JwtStrategy implements AuthStrategy {
  public readonly name: string = "jwt";

  public authenticate(headers: Record<string, string>): AuthResult {
    const header: string | undefined = headers.authorization;
    if (header === undefined || !header.startsWith("Bearer ")) {
      return { ok: false, reason: "missing bearer token" };
    }
    const token: string = header.slice("Bearer ".length);
    // Pretend this verifies a signature.
    return token === "valid.jwt.token" ? { ok: true, userId: "u1" } : { ok: false, reason: "bad signature" };
  }
}

class ApiKeyStrategy implements AuthStrategy {
  public readonly name: string = "api-key";
  private readonly keys: Map<string, string> = new Map<string, string>([["key-abc", "service-billing"]]);

  public authenticate(headers: Record<string, string>): AuthResult {
    const key: string | undefined = headers["x-api-key"];
    const owner: string | undefined = key === undefined ? undefined : this.keys.get(key);
    return owner === undefined ? { ok: false, reason: "unknown api key" } : { ok: true, userId: owner };
  }
}

class BasicAuthStrategy implements AuthStrategy {
  public readonly name: string = "basic";

  public authenticate(headers: Record<string, string>): AuthResult {
    const header: string | undefined = headers.authorization;
    if (header === undefined || !header.startsWith("Basic ")) {
      return { ok: false, reason: "missing basic credentials" };
    }
    const [user, pass] = Buffer.from(header.slice(6), "base64").toString().split(":");
    return pass === "hunter2" ? { ok: true, userId: user } : { ok: false, reason: "bad password" };
  }
}

// Context: tries each configured strategy until one succeeds.
class Authenticator {
  constructor(private readonly strategies: AuthStrategy[]) {}

  public authenticate(headers: Record<string, string>): AuthResult {
    for (const strategy of this.strategies) {
      const result: AuthResult = strategy.authenticate(headers);
      if (result.ok) {
        console.log(`  authenticated via ${strategy.name}`);
        return result;
      }
      console.log(`  ${strategy.name} declined: ${result.reason}`);
    }
    return { ok: false, reason: "no strategy accepted the request" };
  }
}

// ---- Demo ----

const auth: Authenticator = new Authenticator([new JwtStrategy(), new ApiKeyStrategy(), new BasicAuthStrategy()]);

console.log("request with a JWT:");
console.log("=>", auth.authenticate({ authorization: "Bearer valid.jwt.token" }));

console.log("request with an API key:");
console.log("=>", auth.authenticate({ "x-api-key": "key-abc" }));

console.log("request with basic auth:");
console.log("=>", auth.authenticate({ authorization: `Basic ${Buffer.from("ada:hunter2").toString("base64")}` }));

console.log("anonymous request:");
console.log("=>", auth.authenticate({}));
