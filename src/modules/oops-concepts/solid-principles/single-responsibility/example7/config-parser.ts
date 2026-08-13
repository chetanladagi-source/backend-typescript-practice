// Only turns raw text into key/value pairs.

export class ConfigParser {
  public parse(raw: string): Record<string, string> {
    const values: Record<string, string> = {};
    for (const line of raw.split("\n")) {
      if (line.startsWith("#") || !line.includes("=")) {
        continue;
      }
      const separator: number = line.indexOf("=");
      values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
    }
    console.log("[parser] parsed keys:", Object.keys(values).join(", "));
    return values;
  }
}
