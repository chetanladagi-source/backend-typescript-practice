// Registry that resolves a provider name to its auth strategy.

import { AuthResult, AuthStrategy } from "./auth-strategy";

export class AuthRegistry {
  private readonly strategies: Map<string, AuthStrategy> = new Map<string, AuthStrategy>();

  public register(strategy: AuthStrategy): void {
    this.strategies.set(strategy.provider, strategy);
    console.log(`registered auth provider: ${strategy.provider}`);
  }

  public login(provider: string, token: string): AuthResult {
    const strategy: AuthStrategy | undefined = this.strategies.get(provider);
    if (strategy === undefined) {
      console.log(`no strategy registered for provider: ${provider}`);
      return { ok: false, userId: "" };
    }
    const result: AuthResult = strategy.authenticate(token);
    console.log(`login ${result.ok ? "succeeded" : "failed"} for ${provider}`);
    return result;
  }
}
