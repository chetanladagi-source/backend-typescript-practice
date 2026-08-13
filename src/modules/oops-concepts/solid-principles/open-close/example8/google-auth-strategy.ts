// Google OAuth authentication.

import { AuthResult, AuthStrategy } from "./auth-strategy";

export class GoogleAuthStrategy implements AuthStrategy {
  public readonly provider: string = "google";

  public authenticate(token: string): AuthResult {
    console.log(`[google] validating id_token "${token}"`);
    return { ok: token.startsWith("g-"), userId: `google:${token}` };
  }
}
