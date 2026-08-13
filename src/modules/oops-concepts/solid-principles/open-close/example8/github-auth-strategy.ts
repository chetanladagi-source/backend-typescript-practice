// New provider added later without touching any existing file.

import { AuthResult, AuthStrategy } from "./auth-strategy";

export class GithubAuthStrategy implements AuthStrategy {
  public readonly provider: string = "github";

  public authenticate(token: string): AuthResult {
    console.log(`[github] exchanging code "${token}"`);
    return { ok: token.startsWith("gh-"), userId: `github:${token}` };
  }
}
