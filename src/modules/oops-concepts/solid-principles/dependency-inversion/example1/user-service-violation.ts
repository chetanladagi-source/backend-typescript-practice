// Bad design: the user workflow reaches down and builds its own storage engine.

class MySqlDriver {
  private readonly rows: Map<string, string> = new Map<string, string>();

  public insert(id: string, email: string): void {
    console.log(`[mysql] INSERT INTO users VALUES ('${id}', '${email}')`);
    this.rows.set(id, email);
  }

  public selectById(id: string): string | undefined {
    console.log(`[mysql] SELECT * FROM users WHERE id = '${id}'`);
    return this.rows.get(id);
  }
}

export class UserServiceViolation {
  // VIOLATION: constructing `MySqlDriver` here welds high-level policy to a low-level
  // detail, so Postgres, a cache, or a test double can never be substituted.
  private readonly db: MySqlDriver = new MySqlDriver();

  public register(id: string, email: string): void {
    this.db.insert(id, email);
  }

  public describe(id: string): string {
    const email: string | undefined = this.db.selectById(id);
    return email === undefined ? `${id}: not found` : `${id}: ${email}`;
  }
}
