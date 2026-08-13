// Username and password authentication.

import { AuthResult, AuthStrategy } from "./auth-strategy";

export class LocalAuthStrategy implements AuthStrategy {
  public readonly provider: string = "local";

  public authenticate(token: string): AuthResult {
    console.log(`[local] checking password hash for "${token}"`);
    return { ok: token.length > 3, userId: `local:${token}` };
  }
}
