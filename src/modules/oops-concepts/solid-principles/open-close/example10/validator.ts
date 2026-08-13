// Abstraction that every validation rule implements.

export interface SignupRequest {
  name: string;
  email: string;
  age: number;
}

export interface Validator {
  readonly rule: string;
  validate(request: SignupRequest): string | null;
}
