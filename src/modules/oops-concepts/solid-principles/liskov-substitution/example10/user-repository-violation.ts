// LSP violation: StrictUserRepository narrows findById by throwing where the base returns null.

export interface StoredUser {
  readonly id: string;
  readonly email: string;
}

export class UserRepository {
  protected readonly users: Map<string, StoredUser> = new Map<string, StoredUser>();

  public constructor(seed: ReadonlyArray<StoredUser>) {
    for (const user of seed) {
      this.users.set(user.id, user);
    }
  }

  public findById(id: string): StoredUser | null {
    return this.users.get(id) ?? null;
  }
}

// Violation: the base contract returns null for a missing id; this subtype throws instead.
export class StrictUserRepository extends UserRepository {
  public override findById(id: string): StoredUser | null {
    const user: StoredUser | undefined = this.users.get(id);
    if (user === undefined) {
      throw new Error(`User ${id} does not exist`);
    }
    return user;
  }
}

export function describeUser(repository: UserRepository, id: string): string {
  const user: StoredUser | null = repository.findById(id);
  return user === null ? `${id} -> guest` : `${id} -> ${user.email}`;
}
