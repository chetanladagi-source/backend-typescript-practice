// Only stores and reads users from the in-memory table.

export interface StoredUser {
  email: string;
  passwordHash: string;
}

export class UserRepository {
  private readonly rows: StoredUser[] = [];

  public save(user: StoredUser): void {
    this.rows.push(user);
    console.log("[repository] saved", user.email);
  }

  public count(): number {
    return this.rows.length;
  }
}
