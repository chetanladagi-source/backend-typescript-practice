// Prototype — Example 1: clone a base service config per environment.
// Also shows the shallow-copy bug that this pattern is famous for.

export interface Cloneable<T> {
  clone(): T;
}

interface Retry {
  attempts: number;
  backoffMs: number;
}

class ServiceConfig implements Cloneable<ServiceConfig> {
  constructor(
    public name: string,
    public host: string,
    public readonly retry: Retry,
    public tags: string[],
  ) {}

  // Deep clone: nested `retry` and `tags` are rebuilt, not shared.
  public clone(): ServiceConfig {
    return new ServiceConfig(this.name, this.host, { ...this.retry }, [...this.tags]);
  }

  // The tempting one-liner that quietly shares nested state.
  public shallowClone(): ServiceConfig {
    return Object.assign(Object.create(ServiceConfig.prototype), this) as ServiceConfig;
  }

  public toString(): string {
    return `${this.name}@${this.host} retry=${this.retry.attempts}x/${this.retry.backoffMs}ms tags=[${this.tags}]`;
  }
}

// ---- Demo ----

const base: ServiceConfig = new ServiceConfig(
  "payments",
  "localhost:8080",
  { attempts: 3, backoffMs: 200 },
  ["internal"],
);

const staging: ServiceConfig = base.clone();
staging.host = "staging.example.com";
staging.retry.attempts = 5;
staging.tags.push("staging");

console.log("base   :", base.toString());
console.log("staging:", staging.toString());
console.log("base untouched?", base.retry.attempts === 3); // true

console.log("--- now the shallow version ---");
const broken: ServiceConfig = base.shallowClone();
broken.retry.attempts = 99; // `retry` is the SAME object as base.retry
broken.tags.push("oops");

console.log("base   :", base.toString()); // corrupted: attempts=99, tags include "oops"
console.log("broken :", broken.toString());
