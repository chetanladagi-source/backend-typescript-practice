// Template Method — Example 2: report generation.
// Demonstrates hooks that are genuinely empty by default.

export abstract class ReportGenerator {
  // Template method
  public generate(): string {
    const parts: string[] = [];

    parts.push(this.header());
    this.beforeBody(parts); // empty hook
    parts.push(this.body());
    this.afterBody(parts); // empty hook
    parts.push(this.footer());

    return parts.filter((p: string): boolean => p !== "").join("\n");
  }

  protected abstract body(): string;

  protected header(): string {
    return `=== ${this.title()} ===`;
  }

  protected abstract title(): string;

  protected footer(): string {
    return "--- end of report ---";
  }

  // Empty hooks: do nothing unless a subclass opts in.
  protected beforeBody(_parts: string[]): void {}
  protected afterBody(_parts: string[]): void {}
}

class SalesReport extends ReportGenerator {
  protected title(): string {
    return "Sales";
  }

  protected body(): string {
    return ["North  Rs.120000", "South  Rs.98500"].join("\n");
  }

  // Opt into one hook only.
  protected afterBody(parts: string[]): void {
    parts.push("TOTAL  Rs.218500");
  }
}

class AuditReport extends ReportGenerator {
  protected title(): string {
    return "Audit log";
  }

  protected body(): string {
    return ["10:02 ada deleted user u2", "11:14 grace changed billing plan"].join("\n");
  }

  protected beforeBody(parts: string[]): void {
    parts.push("CONFIDENTIAL — internal distribution only");
  }

  // Override a concrete step rather than a hook.
  protected footer(): string {
    return "--- retained for 7 years ---";
  }
}

class MinimalReport extends ReportGenerator {
  protected title(): string {
    return "Uptime";
  }
  protected body(): string {
    return "99.98%";
  }
  // Overrides nothing else; the defaults carry it.
}

// ---- Demo ----

const reports: ReportGenerator[] = [new SalesReport(), new AuditReport(), new MinimalReport()];
reports.forEach((r: ReportGenerator): void => {
  console.log(r.generate());
  console.log("");
});
