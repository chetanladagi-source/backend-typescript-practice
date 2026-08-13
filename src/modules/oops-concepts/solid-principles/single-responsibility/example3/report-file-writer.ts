// Only writes and reads report content in the simulated file system.

export class ReportFileWriter {
  private readonly files: Map<string, string> = new Map<string, string>();

  public write(fileName: string, content: string): void {
    this.files.set(fileName, content);
    console.log("[writer] wrote export", fileName, "bytes:", content.length);
  }

  public read(fileName: string): string {
    return this.files.get(fileName) ?? "";
  }
}
