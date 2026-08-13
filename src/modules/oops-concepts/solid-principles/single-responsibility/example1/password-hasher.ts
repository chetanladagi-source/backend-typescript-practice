// Only turns a plain password into a stored representation.

export class PasswordHasher {
  public hash(plain: string): string {
    let hashed: string = "";
    for (const char of plain) {
      hashed += String(char.charCodeAt(0) % 9);
    }
    return hashed;
  }
}
