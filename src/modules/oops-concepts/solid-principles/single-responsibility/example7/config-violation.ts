// God config loader, kept as the "before" picture.

export interface AppSettings {
  port: number;
  host: string;
}

// SRP violation: reading the raw source, parsing it and validating it are one method.
export class ConfigGod {
  public load(): AppSettings | null {
    const raw: string = "port=8080\nhost=localhost\n# comment";
    console.log("[god] read", raw.length, "chars of raw config");

    const values: Record<string, string> = {};
    for (const line of raw.split("\n")) {
      if (line.startsWith("#") || !line.includes("=")) {
        continue;
      }
      const [key, value] = line.split("=");
      values[key.trim()] = value.trim();
    }

    const port: number = Number(values["port"]);
    if (!Number.isInteger(port) || port <= 0) {
      console.log("[god] invalid port");
      return null;
    }
    if (!values["host"]) {
      console.log("[god] missing host");
      return null;
    }

    console.log("[god] loaded config", values["host"] + ":" + String(port));
    return { port, host: values["host"] };
  }
}
