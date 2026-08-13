// Test double for `PasswordHasher` that is instant and readable.

import { PasswordHasher } from "./password-hasher";

export class FakeHasher implements PasswordHasher {
  private calls: number = 0;

  public hash(plain: string): string {
    this.calls += 1;
    return `fake:${plain}`;
  }

  public verify(plain: string, hashed: string): boolean {
    return this.hash(plain) === hashed;
  }

  public callCount(): number {
    return this.calls;
  }
}
