// Prototype — Example 3: a report definition that is expensive to build.
// Cloning skips the expensive step; `structuredClone` handles the nested Map for us.

export class ReportDefinition {
  public title: string;
  public columns: string[];
  public filters: Map<string, string>;
  private readonly schema: Record<string, string>;

  private constructor(title: string, columns: string[], filters: Map<string, string>, schema: Record<string, string>) {
    this.title = title;
    this.columns = columns;
    this.filters = filters;
    this.schema = schema;
  }

  // The expensive path: pretend this reads table metadata from the warehouse.
  public static buildFromWarehouse(title: string): ReportDefinition {
    console.log(`[warehouse] introspecting schema for "${title}" ... (slow)`);
    const schema: Record<string, string> = { id: "uuid", total: "numeric", created_at: "timestamp" };
    return new ReportDefinition(title, ["id", "total"], new Map<string, string>([["status", "paid"]]), schema);
  }

  // The cheap path: no warehouse round-trip. structuredClone deep-copies the Map correctly,
  // which JSON.parse(JSON.stringify(...)) would have silently turned into {}.
  public clone(): ReportDefinition {
    return new ReportDefinition(
      this.title,
      [...this.columns],
      structuredClone(this.filters),
      { ...this.schema },
    );
  }

  public describe(): string {
    return `"${this.title}" cols=[${this.columns}] filters=${JSON.stringify([...this.filters])}`;
  }
}

// ---- Demo ----

const master: ReportDefinition = ReportDefinition.buildFromWarehouse("Monthly Sales");
console.log("master  :", master.describe());

// Three variants, one warehouse call total.
const refunded: ReportDefinition = master.clone();
refunded.title = "Monthly Refunds";
refunded.filters.set("status", "refunded");

const detailed: ReportDefinition = master.clone();
detailed.title = "Monthly Sales (detailed)";
detailed.columns.push("created_at");

console.log("refunded:", refunded.describe());
console.log("detailed:", detailed.describe());
console.log("master  :", master.describe()); // unchanged
