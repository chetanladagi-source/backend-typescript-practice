// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyLoginService } from "./login-violation";
import { LocalAuthStrategy } from "./local-auth-strategy";
import { GoogleAuthStrategy } from "./google-auth-strategy";
import { GithubAuthStrategy } from "./github-auth-strategy";
import { AuthRegistry } from "./auth-registry";

console.log("=== Violation ===");
const legacy: LegacyLoginService = new LegacyLoginService();
console.log(`local -> ${legacy.login("local", "secret123")}`);
console.log(`google -> ${legacy.login("google", "g-abc")}`);
console.log(`github -> ${legacy.login("github", "gh-xyz")}`);

console.log("\n=== OCP applied ===");
const registry: AuthRegistry = new AuthRegistry();
registry.register(new LocalAuthStrategy());
registry.register(new GoogleAuthStrategy());
registry.login("local", "secret123");
registry.login("google", "g-abc");

console.log("\n=== Extension without modification ===");
registry.register(new GithubAuthStrategy());
registry.login("github", "gh-xyz");
