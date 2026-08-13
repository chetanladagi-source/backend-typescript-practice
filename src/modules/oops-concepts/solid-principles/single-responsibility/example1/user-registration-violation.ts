// God class for user registration, kept as the "before" picture.

export interface RegistrationInput {
  email: string;
  password: string;
}

// SRP violation: validation, hashing, persistence and email all live in one class.
export class UserRegistrationGod {
  private readonly users: Array<{ email: string; passwordHash: string }> = [];

  public register(input: RegistrationInput): boolean {
    if (!input.email.includes("@")) {
      console.log("[god] invalid email:", input.email);
      return false;
    }
    if (input.password.length < 8) {
      console.log("[god] password too short");
      return false;
    }

    let hash: string = "";
    for (const char of input.password) {
      hash += String(char.charCodeAt(0) % 9);
    }

    this.users.push({ email: input.email, passwordHash: hash });
    console.log("[god] saved user:", input.email, "hash:", hash);
    console.log("[god] sending welcome email to", input.email);
    return true;
  }

  public count(): number {
    return this.users.length;
  }
}
