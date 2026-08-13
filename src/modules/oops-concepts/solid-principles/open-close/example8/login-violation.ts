// Violating design: one login service that switches on the auth provider.

export class LegacyLoginService {
  // OCP violation: adding a provider means editing this switch.
  public login(provider: string, token: string): boolean {
    switch (provider) {
      case "local":
        console.log(`Verifying password hash for token ${token}`);
        return token.length > 3;
      case "google":
        console.log(`Verifying Google id_token ${token}`);
        return token.startsWith("g-");
      default:
        console.log(`Unknown auth provider: ${provider}`);
        return false;
    }
  }
}
