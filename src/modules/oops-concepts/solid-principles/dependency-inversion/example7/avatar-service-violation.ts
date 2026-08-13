// Bad design: avatar rules assume the process owns a local filesystem.

class DiskWriter {
  private readonly files: Map<string, string> = new Map<string, string>();

  public write(fullPath: string, contents: string): void {
    console.log(`[disk] write ${fullPath} (${contents.length} bytes)`);
    this.files.set(fullPath, contents);
  }

  public exists(fullPath: string): boolean {
    return this.files.has(fullPath);
  }
}

export class AvatarServiceViolation {
  // VIOLATION: the local filesystem is hard-coded here, so moving to object storage means
  // rewriting the validation rules and no test can avoid touching disk paths.
  private readonly disk: DiskWriter = new DiskWriter();

  public upload(userId: string, contents: string): string {
    if (contents.length > 64) {
      console.log("[avatars] rejected: too large for", userId);
      return "rejected";
    }
    const fullPath: string = `/var/www/uploads/avatars/${userId}.png`;
    this.disk.write(fullPath, contents);
    return fullPath;
  }

  public exists(userId: string): boolean {
    return this.disk.exists(`/var/www/uploads/avatars/${userId}.png`);
  }
}
