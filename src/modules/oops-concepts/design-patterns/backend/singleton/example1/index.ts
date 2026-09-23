// Singleton — Example 1: application config read once at boot.
// Parsing env vars is cheap, but every module must agree on the same values.

type Env = "development" | "production";

export class AppConfig {
  private static instance: AppConfig | undefined;

  public readonly env: Env;
  public readonly port: number;
  public readonly dbUrl: string;

  // Private constructor: `new AppConfig()` is a compile error outside this class.
  private constructor() {
    console.log("[config] parsing environment (happens once)");
    this.env = (process.env.NODE_ENV as Env) ?? "development";
    this.port = Number(process.env.PORT ?? 3000);
    this.dbUrl = process.env.DATABASE_URL ?? "postgres://localhost:5432/dev";
  }

  public static getInstance(): AppConfig {
    if (AppConfig.instance === undefined) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  public isProduction(): boolean {
    return this.env === "production";
  }
}

// ---- Demo ----

// Two unrelated modules ask for config; both get the same object.
const fromServer: AppConfig = AppConfig.getInstance();
const fromMailer: AppConfig = AppConfig.getInstance();

console.log("port seen by server:", fromServer.port);
console.log("db seen by mailer:", fromMailer.dbUrl);
console.log("same instance?", fromServer === fromMailer); // true
console.log("production mode?", fromServer.isProduction());
