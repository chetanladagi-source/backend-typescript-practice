// Runnable entry point contrasting the bcrypt-bound auth flow with the injected one.

import { AuthService } from "./auth-service";
import { AuthServiceViolation } from "./auth-service-violation";
import { BcryptHasher } from "./bcrypt-hasher";
import { FakeHasher } from "./fake-hasher";

console.log("=== Violation ===");
const hardWired: AuthServiceViolation = new AuthServiceViolation();
hardWired.signUp("ada", "superSecret1");
console.log("[violation] login ok:", hardWired.login("ada", "superSecret1"));

console.log("=== DIP applied ===");
const production: AuthService = new AuthService(new BcryptHasher(12));
production.signUp("ada", "superSecret1");
console.log("[production] login ok:", production.login("ada", "superSecret1"));

const fakeHasher: FakeHasher = new FakeHasher();
const underTest: AuthService = new AuthService(fakeHasher);
underTest.signUp("grace", "superSecret1");
console.log("[test] login ok:", underTest.login("grace", "superSecret1"));
console.log("[test] wrong password:", underTest.login("grace", "guess"));
console.log("[test] hash calls:", fakeHasher.callCount());
