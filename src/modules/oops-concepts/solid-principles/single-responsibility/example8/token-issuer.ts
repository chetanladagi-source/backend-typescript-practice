// Only mints tokens.

export class TokenIssuer {
  private counter: number = 0;

  public issue(username: string): string {
    this.counter += 1;
    const token: string = "tok-" + username + "-" + String(this.counter);
    console.log("[issuer] issued", token);
    return token;
  }
}
