// Only orchestrates read, parse and validate.

import { AppSettings } from "./config-violation";
import { ConfigParser } from "./config-parser";
import { ConfigSource } from "./config-source";
import { ConfigValidator } from "./config-validator";

export class AppConfigLoader {
  public constructor(
    private readonly source: ConfigSource,
    private readonly parser: ConfigParser,
    private readonly validator: ConfigValidator
  ) {}

  public load(): AppSettings | null {
    const values: Record<string, string> = this.parser.parse(this.source.read());
    const errors: string[] = this.validator.validate(values);
    if (errors.length > 0) {
      console.log("[loader] invalid config:", errors.join("; "));
      return null;
    }
    const settings: AppSettings = this.validator.toSettings(values);
    console.log("[loader] loaded config", settings.host + ":" + String(settings.port));
    return settings;
  }
}
