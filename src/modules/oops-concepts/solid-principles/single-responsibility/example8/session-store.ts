// Only remembers which token belongs to which user.

export class SessionStore {
  private readonly sessions: Map<string, string> = new Map<string, string>();

  public open(token: string, username: string): void {
    this.sessions.set(token, username);
    console.log("[sessions] stored", token, "total:", this.sessions.size);
  }

  public userFor(token: string): string | undefined {
    return this.sessions.get(token);
  }
}
