// Only orchestrates the registration steps in order.

import { EmailNotifier } from "./email-notifier";
import { PasswordHasher } from "./password-hasher";
import { RegistrationInput } from "./user-registration-violation";
import { UserRepository } from "./user-repository";
import { UserValidator } from "./user-validator";

export class UserRegistrationService {
  public constructor(
    private readonly validator: UserValidator,
    private readonly hasher: PasswordHasher,
    private readonly repository: UserRepository,
    private readonly notifier: EmailNotifier
  ) {}

  public register(input: RegistrationInput): boolean {
    const errors: string[] = this.validator.validate(input);
    if (errors.length > 0) {
      console.log("[service] rejected:", errors.join("; "));
      return false;
    }

    this.repository.save({
      email: input.email,
      passwordHash: this.hasher.hash(input.password)
    });
    this.notifier.sendWelcome(input.email);
    return true;
  }
}
