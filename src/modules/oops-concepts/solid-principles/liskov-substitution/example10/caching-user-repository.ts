// Decorator that adds caching while preserving the same contract.

import { User } from "./user";
import { UserRepository } from "./user-repository";

export class CachingUserRepository implements UserRepository {
  public readonly source: string = "Cached";
  private readonly cache: Map<string, User | null> = new Map<string, User | null>();

  public constructor(private readonly inner: UserRepository) {}

  public findById(id: string): User | null {
    const cached: User | null | undefined = this.cache.get(id);
    if (cached !== undefined) {
      console.log(`cache hit for ${id}`);
      return cached;
    }
    const user: User | null = this.inner.findById(id);
    this.cache.set(id, user);
    return user;
  }
}
