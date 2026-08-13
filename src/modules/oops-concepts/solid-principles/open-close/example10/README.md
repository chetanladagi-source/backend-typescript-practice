# Example 10 - Request validation

Scenario: a signup request is validated before an account is created.

Violation: `LegacySignupValidator.validate()` is a fixed sequence of if-checks.
An age policy cannot be added, reordered, or reused elsewhere without editing the
method, and the rules cannot be turned on per endpoint.

Fix: a `Validator` interface returning an error or `null`, one rule per class, and
a `ValidationPipeline` that runs whatever list it is composed with.

Takeaway: validation becomes a list you assemble at the call site - `AgeRangeValidator`
catches the underage request that the legacy chain silently accepted.
