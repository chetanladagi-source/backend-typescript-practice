// Runnable entry point contrasting the hard-wired service with the injected one.

import { InMemoryDatabase } from "./in-memory-database";
import { MySqlDatabase } from "./mysql-database";
import { UserService } from "./user-service";
import { UserServiceViolation } from "./user-service-violation";

console.log("=== Violation ===");
const hardWired: UserServiceViolation = new UserServiceViolation();
hardWired.register("u1", "ada@example.com");
console.log("[violation]", hardWired.describe("u1"));
console.log("[violation]", hardWired.describe("u404"));

console.log("=== DIP applied ===");
const production: UserService = new UserService(new MySqlDatabase());
production.register("u1", "ada@example.com");
console.log("[production]", production.describe("u1"));

const fakeDb: InMemoryDatabase = new InMemoryDatabase();
const underTest: UserService = new UserService(fakeDb);
underTest.register("u2", "grace@example.com");
console.log("[test]", underTest.describe("u2"), "rows:", fakeDb.count());
