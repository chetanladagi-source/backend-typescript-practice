// Memento — Example 3: config deploy with automatic rollback.
// The backend version of undo: snapshot, change, health-check, revert if unhealthy.

export interface ConfigMemento {
  readonly version: number;
}

class ConfigSnapshot implements ConfigMemento {
  constructor(
    public readonly version: number,
    private readonly values: Record<string, string>,
  ) {}

  public getValues(): Record<string, string> {
    return { ...this.values };
  }
}

// Originator
class ServiceConfig {
  private values: Record<string, string> = {
    replicas: "3",
    timeoutMs: "5000",
    featureFlags: "search",
  };
  private version: number = 1;

  public apply(changes: Record<string, string>): void {
    this.values = { ...this.values, ...changes };
    this.version++;
    console.log(`  applied v${this.version}: ${JSON.stringify(changes)}`);
  }

  public snapshot(): ConfigMemento {
    return new ConfigSnapshot(this.version, { ...this.values });
  }

  public rollbackTo(memento: ConfigMemento): void {
    if (!(memento instanceof ConfigSnapshot)) {
      throw new Error("unknown memento type");
    }
    this.values = memento.getValues();
    this.version = memento.version;
    console.log(`  rolled back to v${this.version}`);
  }

  public describe(): string {
    return `v${this.version} ${JSON.stringify(this.values)}`;
  }

  // Pretend health check: too few replicas or too short a timeout is unhealthy.
  public isHealthy(): boolean {
    return Number(this.values.replicas) >= 2 && Number(this.values.timeoutMs) >= 1000;
  }
}

// Caretaker: applies a change behind a health gate.
class DeployManager {
  public deploy(config: ServiceConfig, changes: Record<string, string>): boolean {
    const before: ConfigMemento = config.snapshot();
    config.apply(changes);

    if (!config.isHealthy()) {
      console.log("  health check FAILED");
      config.rollbackTo(before);
      return false;
    }
    console.log("  health check passed");
    return true;
  }
}

// ---- Demo ----

const config: ServiceConfig = new ServiceConfig();
const deployer: DeployManager = new DeployManager();

console.log("start:", config.describe());

console.log("deploy 1 — scale up:");
console.log("  result:", deployer.deploy(config, { replicas: "6" }));
console.log("  now:", config.describe());

console.log("deploy 2 — add a feature flag:");
console.log("  result:", deployer.deploy(config, { featureFlags: "search,recommendations" }));
console.log("  now:", config.describe());

console.log("deploy 3 — a bad timeout:");
console.log("  result:", deployer.deploy(config, { timeoutMs: "50" }));
console.log("  now:", config.describe()); // reverted, feature flag from deploy 2 intact
