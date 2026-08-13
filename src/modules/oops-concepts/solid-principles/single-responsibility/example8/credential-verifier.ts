// Only decides whether a username/password pair is genuine.

import { Credentials } from "./auth-violation";

export class CredentialVerifier {
  private readonly accounts: Record<string, string> = { alice: "wonderland", bob: "builder" };

  public verify(credentials: Credentials): boolean {
    const matches: boolean = this.accounts[credentials.username] === credentials.password;
    console.log("[verifier]", credentials.username, matches ? "verified" : "rejected");
    return matches;
  }
}
