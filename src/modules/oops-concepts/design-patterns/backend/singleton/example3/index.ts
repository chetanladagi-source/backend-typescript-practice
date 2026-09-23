// Singleton — Example 3: an application logger.
// Shows the two ways to do it in Node: the classic class form, and the
// module-level form that JavaScript gives you for free.

type Level = "info" | "warn" | "error";

class Logger {
  private static instance: Logger | undefined;

  private readonly buffer: string[] = [];
  private minLevel: Level = "info";

  private constructor() {}

  public static getInstance(): Logger {
    if (Logger.instance === undefined) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLevel(level: Level): void {
    this.minLevel = level;
  }

  public log(level: Level, message: string): void {
    const order: Level[] = ["info", "warn", "error"];
    if (order.indexOf(level) < order.indexOf(this.minLevel)) {
      return;
    }
    const line: string = `[${level.toUpperCase()}] ${message}`;
    this.buffer.push(line);
    console.log(line);
  }

  public history(): readonly string[] {
    return this.buffer;
  }
}

// The Node shortcut: `import` caches modules, so an exported instance is already a
// singleton. Simpler, but eager — it is built even if nothing ever uses it.
export const logger: Logger = Logger.getInstance();

// ---- Demo ----

const fromAuth: Logger = Logger.getInstance();
const fromPayments: Logger = Logger.getInstance();

fromAuth.log("info", "user signed in");
fromPayments.log("error", "card declined");

// One call changes the level for the entire app — the power and the danger of a singleton.
fromAuth.setLevel("error");
fromPayments.log("info", "this is now filtered out");

console.log("same logger?", fromAuth === fromPayments); // true
console.log("shared history:", fromPayments.history());
