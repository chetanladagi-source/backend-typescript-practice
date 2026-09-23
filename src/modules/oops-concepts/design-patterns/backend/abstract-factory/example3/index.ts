// Abstract Factory — Example 3: an environment kit.
// One switch at boot decides logger + cache + mailer, so dev never sends real email.

export interface Logger {
  log(message: string): void;
}

export interface Cache {
  set(key: string, value: string): void;
  get(key: string): string | undefined;
}

export interface Mailer {
  send(to: string, subject: string): void;
}

// --- Development family: everything local and harmless ---

class ConsoleLogger implements Logger {
  public log(message: string): void {
    console.log(`  [dev-log] ${message}`);
  }
}

class MemoryCache implements Cache {
  private readonly store: Map<string, string> = new Map<string, string>();
  public set(key: string, value: string): void {
    this.store.set(key, value);
  }
  public get(key: string): string | undefined {
    return this.store.get(key);
  }
}

class NoopMailer implements Mailer {
  public send(to: string, subject: string): void {
    console.log(`  [dev-mail] pretended to send "${subject}" to ${to}`);
  }
}

// --- Production family: the real thing ---

class JsonLogger implements Logger {
  public log(message: string): void {
    console.log(`  ${JSON.stringify({ level: "info", message, ts: "2031-01-01T00:00:00Z" })}`);
  }
}

class RedisCache implements Cache {
  private readonly store: Map<string, string> = new Map<string, string>();
  public set(key: string, value: string): void {
    console.log(`  [redis] SET ${key}`);
    this.store.set(key, value);
  }
  public get(key: string): string | undefined {
    console.log(`  [redis] GET ${key}`);
    return this.store.get(key);
  }
}

class SmtpMailer implements Mailer {
  public send(to: string, subject: string): void {
    console.log(`  [smtp] delivered "${subject}" to ${to}`);
  }
}

export interface EnvironmentFactory {
  createLogger(): Logger;
  createCache(): Cache;
  createMailer(): Mailer;
}

class DevelopmentFactory implements EnvironmentFactory {
  public createLogger(): Logger {
    return new ConsoleLogger();
  }
  public createCache(): Cache {
    return new MemoryCache();
  }
  public createMailer(): Mailer {
    return new NoopMailer();
  }
}

class ProductionFactory implements EnvironmentFactory {
  public createLogger(): Logger {
    return new JsonLogger();
  }
  public createCache(): Cache {
    return new RedisCache();
  }
  public createMailer(): Mailer {
    return new SmtpMailer();
  }
}

function runSignupFlow(factory: EnvironmentFactory, email: string): void {
  const logger: Logger = factory.createLogger();
  const cache: Cache = factory.createCache();
  const mailer: Mailer = factory.createMailer();

  logger.log(`signup started for ${email}`);
  cache.set(`user:${email}`, "pending");
  mailer.send(email, "Confirm your address");
  logger.log(`cached status = ${cache.get(`user:${email}`)}`);
}

// ---- Demo ----

console.log("--- development ---");
runSignupFlow(new DevelopmentFactory(), "ada@example.com");

console.log("--- production ---");
runSignupFlow(new ProductionFactory(), "ada@example.com");
