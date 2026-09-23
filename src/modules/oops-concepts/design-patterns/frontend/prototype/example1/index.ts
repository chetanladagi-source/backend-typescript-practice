// Prototype (frontend) — Example 1: the "Duplicate widget" button.
// Shows the shallow-copy bug that gets misdiagnosed as a React bug.

export interface WidgetConfig {
  dataSource: string;
  refreshSeconds: number;
  thresholds: { warn: number; critical: number };
}

export class DashboardWidget {
  constructor(
    public id: string,
    public title: string,
    public readonly config: WidgetConfig,
    public gridArea: [number, number],
  ) {}

  // Correct: every nested object is rebuilt.
  public duplicate(newId: string): DashboardWidget {
    return new DashboardWidget(
      newId,
      `${this.title} (copy)`,
      { ...this.config, thresholds: { ...this.config.thresholds } },
      [...this.gridArea] as [number, number],
    );
  }

  // The tempting one-liner a lot of "Duplicate" buttons actually ship with.
  public duplicateShallow(newId: string): DashboardWidget {
    return { ...this, id: newId, title: `${this.title} (copy)` } as DashboardWidget;
  }

  public describe(): string {
    return describe(this);
  }
}

// A free function, so it still works on an object that lost its prototype.
function describe(w: DashboardWidget): string {
  return `${w.id} "${w.title}" src=${w.config.dataSource} warn=${w.config.thresholds.warn} at [${w.gridArea}]`;
}

// ---- Demo ----

const original: DashboardWidget = new DashboardWidget(
  "w1",
  "API latency",
  { dataSource: "/metrics/latency", refreshSeconds: 30, thresholds: { warn: 200, critical: 500 } },
  [0, 0],
);

console.log("--- correct deep duplicate ---");
const copy: DashboardWidget = original.duplicate("w2");
copy.gridArea = [1, 0];
copy.config.thresholds.warn = 400; // the user tweaks the copy

console.log("original:", original.describe());
console.log("copy    :", copy.describe());
console.log("original intact?", original.config.thresholds.warn === 200); // true

console.log("\n--- shallow duplicate: two bugs for the price of one ---");
const broken: DashboardWidget = original.duplicateShallow("w3");
broken.config.thresholds.warn = 999; // user edits the COPY only
broken.gridArea[0] = 5;

// Bug 1: the nested objects are shared, so editing the copy edits the original.
console.log("original:", describe(original)); // silently changed to 999 and [5,0]
console.log("copy    :", describe(broken));
console.log("shared nested object?", original.config.thresholds === broken.config.thresholds);

// Bug 2: spreading an instance copies own properties only. Methods live on the
// prototype, so the "copy" is a plain object wearing the class as a type lie.
console.log("copy is a DashboardWidget?", broken instanceof DashboardWidget);
console.log("copy has describe()?", typeof broken.describe);
