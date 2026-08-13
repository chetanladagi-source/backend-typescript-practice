// Bad design: the login rules are welded to one hashing library.

class BcryptLibrary {
  public hashSync(plain: string, rounds: number): string {
    console.log(`[bcrypt] hashing with ${rounds} rounds (slow by design)`);
    let digest: number = 7;
    for (const char of plain) {
      digest = (digest * 31 + char.charCodeAt(0)) % 1_000_003;
    }
    return `$2b$${rounds}$${digest.toString(16)}`;
  }
}

export class AuthServiceViolation {
  private readonly credentials: Map<string, string> = new Map<string, string>();

  // VIOLATION: the algorithm is chosen inside the policy, so every auth test pays the
  // deliberate bcrypt cost and moving to argon2 means rewriting this class.
  private readonly bcrypt: BcryptLibrary = new BcryptLibrary();

  public signUp(username: string, password: string): void {
    this.credentials.set(username, this.bcrypt.hashSync(password, 12));
    console.log("[auth] registered", username);
  }

  public login(username: string, password: string): boolean {
    const stored: string | undefined = this.credentials.get(username);
    return stored !== undefined && this.bcrypt.hashSync(password, 12) === stored;
  }
}
