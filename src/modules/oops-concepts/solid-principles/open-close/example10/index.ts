// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacySignupValidator, LegacySignupInput } from "./validation-violation";
import { SignupRequest, Validator } from "./validator";
import { RequiredFieldsValidator } from "./required-fields-validator";
import { EmailFormatValidator } from "./email-format-validator";
import { AgeRangeValidator } from "./age-range-validator";
import { ValidationPipeline } from "./validation-pipeline";

const request: SignupRequest = { name: "Asha", email: "asha@example.com", age: 8 };

console.log("=== Violation ===");
const legacy: LegacySignupValidator = new LegacySignupValidator();
const legacyInput: LegacySignupInput = request;
const legacyErrors: string[] = legacy.validate(legacyInput);
console.log(legacyErrors.length === 0 ? "request is valid (age never checked)" : legacyErrors.join("\n"));

console.log("\n=== OCP applied ===");
const validators: Validator[] = [new RequiredFieldsValidator(), new EmailFormatValidator()];
const pipeline: ValidationPipeline = new ValidationPipeline(validators);
pipeline.run(request);

console.log("\n=== Extension without modification ===");
const extended: ValidationPipeline = new ValidationPipeline([
  ...validators,
  new AgeRangeValidator(18, 99),
]);
extended.run(request);
