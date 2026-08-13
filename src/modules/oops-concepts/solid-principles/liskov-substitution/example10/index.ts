// Runnable entry point: violating design first, then the LSP-compliant design.

import { UserRepository as BadRepository, StrictUserRepository, describeUser as badDescribeUser } from "./user-repository-violation";
import { InMemoryUserRepository } from "./in-memory-user-repository";
import { CachingUserRepository } from "./caching-user-repository";
import { describeUser } from "./user-lookup-service";
import { User } from "./user";

const seed: ReadonlyArray<User> = [
  { id: "u-1", email: "asha@example.com" },
  { id: "u-2", email: "ravi@example.com" }
];

export function run(): void {
  console.log("=== Violation ===");
  console.log(badDescribeUser(new BadRepository(seed), "u-404"));
  try {
    console.log(badDescribeUser(new StrictUserRepository(seed), "u-404"));
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  const primary: InMemoryUserRepository = new InMemoryUserRepository(seed);
  const cached: CachingUserRepository = new CachingUserRepository(primary);
  console.log(describeUser(primary, "u-1"));
  console.log(describeUser(cached, "u-404"));
  console.log(describeUser(cached, "u-404"));
}

run();
