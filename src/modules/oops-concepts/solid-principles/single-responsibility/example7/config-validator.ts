// Only checks parsed values against the required shape.

import { AppSettings } from "./config-violation";

export class ConfigValidator {
  public validate(values: Record<string, string>): string[] {
    const errors: string[] = [];
    const port: number = Number(values["port"]);
    if (!Number.isInteger(port) || port <= 0) {
      errors.push("port must be a positive integer");
    }
    if (!values["host"]) {
      errors.push("host is required");
    }
    return errors;
  }

  public toSettings(values: Record<string, string>): AppSettings {
    return { port: Number(values["port"]), host: values["host"] };
  }
}
