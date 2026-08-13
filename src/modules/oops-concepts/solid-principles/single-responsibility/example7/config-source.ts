// Only produces raw configuration text.

export class ConfigSource {
  public constructor(private readonly raw: string) {}

  public read(): string {
    console.log("[source] read", this.raw.length, "chars of raw config");
    return this.raw;
  }
}
