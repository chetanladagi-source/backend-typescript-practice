// Pipeline that runs any composed list of validators.

import { SignupRequest, Validator } from "./validator";

export class ValidationPipeline {
  public constructor(private readonly validators: Validator[]) {}

  public run(request: SignupRequest): string[] {
    const errors: string[] = [];
    for (const validator of this.validators) {
      const error: string | null = validator.validate(request);
      if (error !== null) {
        errors.push(`[${validator.rule}] ${error}`);
      }
    }
    console.log(errors.length === 0 ? "request is valid" : errors.join("\n"));
    return errors;
  }
}
