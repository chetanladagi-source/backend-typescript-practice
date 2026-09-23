// Facade — Example 3: user onboarding.
// Five collaborators; the controller sees one method and one result object.

class PasswordHasher {
  public hash(plain: string): string {
    console.log("  [hash] bcrypt cost=12");
    return `$2b$12$${Buffer.from(plain).toString("base64").slice(0, 16)}`;
  }
}

class UserRepository {
  private readonly users: Map<string, { email: string; hash: string }> = new Map();

  public exists(email: string): boolean {
    return this.users.has(email);
  }

  public create(email: string, hash: string): string {
    const id: string = `u${this.users.size + 1}`;
    this.users.set(email, { email, hash });
    console.log(`  [db] inserted ${id} (${email})`);
    return id;
  }
}

class TokenService {
  public issue(userId: string): string {
    console.log(`  [jwt] signed access token for ${userId}`);
    return `eyJ.${Buffer.from(userId).toString("base64")}.sig`;
  }
}

class AuditLog {
  public record(action: string, userId: string): void {
    console.log(`  [audit] ${action} by ${userId}`);
  }
}

class WelcomeMailer {
  public send(email: string): void {
    console.log(`  [mail] welcome email queued for ${email}`);
  }
}

export interface SignupResult {
  userId: string;
  token: string;
}

// --- Facade ---
export class OnboardingFacade {
  private readonly hasher: PasswordHasher = new PasswordHasher();
  private readonly users: UserRepository = new UserRepository();
  private readonly tokens: TokenService = new TokenService();
  private readonly audit: AuditLog = new AuditLog();
  private readonly mailer: WelcomeMailer = new WelcomeMailer();

  public signUp(email: string, password: string): SignupResult {
    if (this.users.exists(email)) {
      throw new Error(`${email} is already registered`);
    }

    const userId: string = this.users.create(email, this.hasher.hash(password));
    const token: string = this.tokens.issue(userId);

    this.audit.record("signup", userId);
    this.mailer.send(email);

    return { userId, token };
  }
}

// ---- Demo ----

const onboarding: OnboardingFacade = new OnboardingFacade();

console.log("first signup:");
console.log("=>", onboarding.signUp("ada@example.com", "correct-horse-battery"));

console.log("duplicate signup:");
try {
  onboarding.signUp("ada@example.com", "another-password");
} catch (err) {
  console.log("=>", (err as Error).message);
}
