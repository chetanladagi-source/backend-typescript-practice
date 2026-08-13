// Runnable entry point contrasting the god class with the SRP version.

import { EmailNotifier } from "./email-notifier";
import { PasswordHasher } from "./password-hasher";
import { RegistrationInput, UserRegistrationGod } from "./user-registration-violation";
import { UserRegistrationService } from "./user-registration-service";
import { UserRepository } from "./user-repository";
import { UserValidator } from "./user-validator";

const inputs: RegistrationInput[] = [
  { email: "ada@example.com", password: "superSecret1" },
  { email: "broken-email", password: "superSecret1" }
];

console.log("=== Violation ===");
const god: UserRegistrationGod = new UserRegistrationGod();
for (const input of inputs) {
  god.register(input);
}
console.log("[god] stored users:", god.count());

console.log("=== SRP applied ===");
const notifier: EmailNotifier = new EmailNotifier();
const repository: UserRepository = new UserRepository();
const service: UserRegistrationService = new UserRegistrationService(
  new UserValidator(),
  new PasswordHasher(),
  repository,
  notifier
);
for (const input of inputs) {
  service.register(input);
}
console.log("[service] stored users:", repository.count(), "emails:", notifier.sentCount());
