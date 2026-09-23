// Proxy — Example 2: protection proxy.
// The real service has no idea permissions exist; the proxy is the gate.

export interface AdminService {
  deleteUser(id: string): string;
  listUsers(): string[];
}

class RealAdminService implements AdminService {
  private users: string[] = ["u1", "u2", "u3"];

  public deleteUser(id: string): string {
    this.users = this.users.filter((u: string): boolean => u !== id);
    return `deleted ${id}`;
  }

  public listUsers(): string[] {
    return [...this.users];
  }
}

interface Session {
  user: string;
  roles: string[];
}

class ProtectedAdminService implements AdminService {
  constructor(
    private readonly real: AdminService,
    private readonly session: Session,
  ) {}

  private require(role: string): void {
    if (!this.session.roles.includes(role)) {
      throw new Error(`${this.session.user} lacks the "${role}" role`);
    }
  }

  public deleteUser(id: string): string {
    this.require("admin");
    console.log(`  [audit] ${this.session.user} deleting ${id}`);
    return this.real.deleteUser(id);
  }

  public listUsers(): string[] {
    this.require("viewer");
    return this.real.listUsers();
  }
}

// ---- Demo ----

const backend: AdminService = new RealAdminService();

const admin: AdminService = new ProtectedAdminService(backend, { user: "ada", roles: ["admin", "viewer"] });
const viewer: AdminService = new ProtectedAdminService(backend, { user: "linus", roles: ["viewer"] });

console.log("admin lists:", admin.listUsers());
console.log("admin deletes:", admin.deleteUser("u2"));

console.log("viewer lists:", viewer.listUsers());
try {
  viewer.deleteUser("u3");
} catch (err) {
  console.log("viewer deletes:", (err as Error).message);
}

// Both proxies wrap the same subject, so the deletion is visible to everyone.
console.log("shared state:", backend.listUsers());
