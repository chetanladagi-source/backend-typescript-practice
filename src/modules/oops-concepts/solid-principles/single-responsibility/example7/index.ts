// Runnable entry point contrasting the god class with the SRP version.

import { AppConfigLoader } from "./app-config-loader";
import { ConfigGod } from "./config-violation";
import { ConfigParser } from "./config-parser";
import { ConfigSource } from "./config-source";
import { ConfigValidator } from "./config-validator";

console.log("=== Violation ===");
console.log(new ConfigGod().load());

console.log("=== SRP applied ===");
const parser: ConfigParser = new ConfigParser();
const validator: ConfigValidator = new ConfigValidator();
const good: AppConfigLoader = new AppConfigLoader(
  new ConfigSource("port=8080\nhost=localhost\n# comment"),
  parser,
  validator
);
console.log(good.load());

const bad: AppConfigLoader = new AppConfigLoader(new ConfigSource("port=abc"), parser, validator);
console.log(bad.load());
