// Runnable entry point contrasting the god class with the SRP version.

import { AuthGod, Credentials } from "./auth-violation";
import { AuthenticationService } from "./authentication-service";
import { CredentialVerifier } from "./credential-verifier";
import { SessionStore } from "./session-store";
import { TokenIssuer } from "./token-issuer";

const attempts: Credentials[] = [
  { username: "alice", password: "wonderland" },
  { username: "bob", password: "wrong" }
];

console.log("=== Violation ===");
const god: AuthGod = new AuthGod();
for (const attempt of attempts) {
  console.log("[god] result:", god.login(attempt));
}

console.log("=== SRP applied ===");
const sessions: SessionStore = new SessionStore();
const service: AuthenticationService = new AuthenticationService(
  new CredentialVerifier(),
  new TokenIssuer(),
  sessions
);
for (const attempt of attempts) {
  const token: string | null = service.login(attempt);
  console.log("[service] result:", token, "->", token === null ? "-" : sessions.userFor(token));
}
