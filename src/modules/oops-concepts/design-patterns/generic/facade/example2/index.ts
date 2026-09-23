// Facade (generic) — Example 2: one hire() hides four HR subsystems.

class BackgroundCheck {
  public run(name: string): void {
    if (name === "Flagged") {
      throw new Error("background check failed");
    }
    console.log(`    [BG] cleared ${name}`);
  }
}

class PayrollSetup {
  public create(name: string, salary: number): string {
    const id: string = `EMP-${name.slice(0, 3).toUpperCase()}`;
    console.log(`    [Payroll] ${id} salary Rs.${salary}`);
    return id;
  }

  public rollback(id: string): void {
    console.log(`    [Payroll] rolled back ${id}`);
  }
}

class BadgePrinter {
  public print(id: string): void {
    console.log(`    [Badge] printed for ${id}`);
  }
}

class WelcomeMailer {
  public send(name: string, id: string): void {
    console.log(`    [Email] welcome ${name} (${id})`);
  }
}

export class HireFacade {
  constructor(
    private readonly background: BackgroundCheck,
    private readonly payroll: PayrollSetup,
    private readonly badges: BadgePrinter,
    private readonly mail: WelcomeMailer,
  ) {}

  public hire(name: string, salary: number): { ok: boolean; id?: string; error?: string } {
    console.log(`  hire ${name}`);
    try {
      this.background.run(name);
    } catch (err) {
      return { ok: false, error: (err as Error).message };
    }
    const id: string = this.payroll.create(name, salary);
    try {
      this.badges.print(id);
      this.mail.send(name, id);
      return { ok: true, id };
    } catch (err) {
      this.payroll.rollback(id);
      return { ok: false, error: (err as Error).message };
    }
  }
}

// ---- Demo ----

const hr: HireFacade = new HireFacade(new BackgroundCheck(), new PayrollSetup(), new BadgePrinter(), new WelcomeMailer());

console.log("--- happy path ---");
console.log("result:", hr.hire("Ada", 180000));

console.log("\n--- background fail, payroll never created ---");
console.log("result:", hr.hire("Flagged", 120000));
