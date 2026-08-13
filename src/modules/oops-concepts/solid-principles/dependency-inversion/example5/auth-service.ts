// High-level policy: signup and login rules, hashing algorithm unknown.

import { PasswordHasher } from "./password-hasher";

export class AuthService {
  private readonly credentials: Map<string, string> = new Map<string, string>();

  constructor(private readonly hasher: PasswordHasher) {}

  public signUp(username: string, password: string): void {
    this.credentials.set(username, this.hasher.hash(password));
    console.log("[auth] registered", username);
  }

  public login(username: string, password: string): boolean {
    const stored: string | undefined = this.credentials.get(username);
    if (stored === undefined) {
      return false;
    }
    return this.hasher.verify(password, stored);
  }
}
