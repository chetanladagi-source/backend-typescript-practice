// Only orchestrates verify, issue and store during login.

import { CredentialVerifier } from "./credential-verifier";
import { Credentials } from "./auth-violation";
import { SessionStore } from "./session-store";
import { TokenIssuer } from "./token-issuer";

export class AuthenticationService {
  public constructor(
    private readonly verifier: CredentialVerifier,
    private readonly issuer: TokenIssuer,
    private readonly sessions: SessionStore
  ) {}

  public login(credentials: Credentials): string | null {
    if (!this.verifier.verify(credentials)) {
      return null;
    }
    const token: string = this.issuer.issue(credentials.username);
    this.sessions.open(token, credentials.username);
    return token;
  }
}
