// Rule: name and email must be present.

import { SignupRequest, Validator } from "./validator";

export class RequiredFieldsValidator implements Validator {
  public readonly rule: string = "required-fields";

  public validate(request: SignupRequest): string | null {
    if (request.name.trim() === "" || request.email.trim() === "") {
      return "name and email are required";
    }
    return null;
  }
}
