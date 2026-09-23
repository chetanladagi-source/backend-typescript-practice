// Flyweight — Example 1: one shared Role object per role name.
// 50,000 users but only 3 distinct permission lists.

// Intrinsic state: identical for every user with this role, and immutable.
export class Role {
  constructor(
    public readonly name: string,
    public readonly permissions: readonly string[],
  ) {}

  public can(action: string): boolean {
    return this.permissions.includes(action);
  }
}

// The flyweight factory: same key in, same object out.
class RoleFactory {
  private static readonly pool: Map<string, Role> = new Map<string, Role>();

  private static readonly definitions: Record<string, string[]> = {
    admin: ["read", "write", "delete", "manage-users"],
    editor: ["read", "write"],
    viewer: ["read"],
  };

  public static get(name: string): Role {
    const cached: Role | undefined = RoleFactory.pool.get(name);
    if (cached !== undefined) {
      return cached;
    }
    console.log(`  [factory] creating the one and only "${name}" role`);
    const role: Role = new Role(name, RoleFactory.definitions[name] ?? []);
    RoleFactory.pool.set(name, role);
    return role;
  }

  public static poolSize(): number {
    return RoleFactory.pool.size;
  }
}

// Context object: holds the unique (extrinsic) state plus a reference to the flyweight.
class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly role: Role,
  ) {}
}

// ---- Demo ----

const roleNames: string[] = ["admin", "editor", "viewer"];
const users: User[] = Array.from({ length: 50_000 }, (_: unknown, i: number): User => {
  return new User(`u${i}`, `user${i}@example.com`, RoleFactory.get(roleNames[i % 3]));
});

console.log("users created:", users.length);
console.log("distinct Role objects in memory:", RoleFactory.poolSize()); // 3, not 50000

// Every user with the same role literally shares one object.
console.log("shared instance?", users[0].role === users[3].role); // true
console.log("user0 can delete?", users[0].role.can("delete"));
console.log("user1 can delete?", users[1].role.can("delete"));
