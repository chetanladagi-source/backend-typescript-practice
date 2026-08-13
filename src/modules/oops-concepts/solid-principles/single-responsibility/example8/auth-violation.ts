// God authentication class, kept as the "before" picture.

export interface Credentials {
  username: string;
  password: string;
}

// SRP violation: credential checks, token minting and session storage in one class.
export class AuthGod {
  private readonly accounts: Record<string, string> = { alice: "wonderland", bob: "builder" };
  private readonly sessions: Map<string, string> = new Map<string, string>();
  private counter: number = 0;

  public login(credentials: Credentials): string | null {
    if (this.accounts[credentials.username] !== credentials.password) {
      console.log("[god] bad credentials for", credentials.username);
      return null;
    }

    this.counter += 1;
    const token: string = "tok-" + credentials.username + "-" + String(this.counter);

    this.sessions.set(token, credentials.username);
    console.log("[god] issued", token, "sessions:", this.sessions.size);
    return token;
  }
}
