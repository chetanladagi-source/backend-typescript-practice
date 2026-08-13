// Abstraction that every authentication provider implements.

export interface AuthResult {
  ok: boolean;
  userId: string;
}

export interface AuthStrategy {
  readonly provider: string;
  authenticate(token: string): AuthResult;
}
