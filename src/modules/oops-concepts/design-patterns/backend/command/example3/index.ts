// Command — Example 3: deployment steps with automatic rollback,
// plus a macro command (a command made of commands).

export interface DeployCommand {
  readonly label: string;
  execute(): void;
  rollback(): void;
}

class Infrastructure {
  public readonly state: Set<string> = new Set<string>();

  public apply(change: string): void {
    this.state.add(change);
    console.log(`    + ${change}`);
  }

  public revert(change: string): void {
    this.state.delete(change);
    console.log(`    - ${change}`);
  }
}

class SimpleStep implements DeployCommand {
  constructor(
    public readonly label: string,
    private readonly infra: Infrastructure,
    private readonly change: string,
    private readonly shouldFail: boolean = false,
  ) {}

  public execute(): void {
    if (this.shouldFail) {
      throw new Error(`${this.label} failed`);
    }
    this.infra.apply(this.change);
  }

  public rollback(): void {
    this.infra.revert(this.change);
  }
}

// Macro command: a command containing commands. Composite meets Command.
class MacroCommand implements DeployCommand {
  private readonly completed: DeployCommand[] = [];

  constructor(public readonly label: string, private readonly steps: DeployCommand[]) {}

  public execute(): void {
    for (const step of this.steps) {
      step.execute();
      this.completed.push(step);
    }
  }

  // Undo in reverse order — the detail everyone gets wrong first time.
  public rollback(): void {
    [...this.completed].reverse().forEach((step: DeployCommand): void => step.rollback());
    this.completed.length = 0;
  }
}

// Invoker: runs steps and unwinds everything already done if one fails.
class Deployer {
  public run(steps: DeployCommand[]): boolean {
    const done: DeployCommand[] = [];
    for (const step of steps) {
      try {
        console.log(`  running ${step.label}`);
        step.execute();
        done.push(step);
      } catch (err) {
        console.log(`  FAILED: ${(err as Error).message} — rolling back`);
        [...done].reverse().forEach((s: DeployCommand): void => s.rollback());
        return false;
      }
    }
    return true;
  }
}

// ---- Demo ----

const infra: Infrastructure = new Infrastructure();
const deployer: Deployer = new Deployer();

console.log("--- successful deploy ---");
console.log(
  "result:",
  deployer.run([
    new SimpleStep("provision db", infra, "database"),
    new MacroCommand("bring up services", [
      new SimpleStep("api", infra, "api-pods"),
      new SimpleStep("worker", infra, "worker-pods"),
    ]),
    new SimpleStep("open traffic", infra, "load-balancer"),
  ]),
);
console.log("state:", [...infra.state]);

console.log("--- deploy that fails at the last step ---");
const infra2: Infrastructure = new Infrastructure();
console.log(
  "result:",
  deployer.run([
    new SimpleStep("provision db", infra2, "database"),
    new MacroCommand("bring up services", [
      new SimpleStep("api", infra2, "api-pods"),
      new SimpleStep("worker", infra2, "worker-pods"),
    ]),
    new SimpleStep("open traffic", infra2, "load-balancer", true),
  ]),
);
console.log("state after rollback:", [...infra2.state]); // empty
