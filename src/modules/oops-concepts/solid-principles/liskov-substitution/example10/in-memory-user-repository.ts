// Primary implementation honouring the null-for-missing contract.

import { User } from "./user";
import { UserRepository } from "./user-repository";

export class InMemoryUserRepository implements UserRepository {
  public readonly source: string = "InMemory";
  private readonly users: Map<string, User> = new Map<string, User>();

  public constructor(seed: ReadonlyArray<User>) {
    for (const user of seed) {
      this.users.set(user.id, user);
    }
  }

  public findById(id: string): User | null {
    return this.users.get(id) ?? null;
  }
}
