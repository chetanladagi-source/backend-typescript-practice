// Bridge — Example 2: report types × output renderers.
// "What data to gather" and "how to format it" are two independent reasons to change.

export interface Row {
  [column: string]: string | number;
}

// --- Implementor: HOW rows are rendered ---
export interface Renderer {
  render(title: string, rows: Row[]): string;
}

class JsonRenderer implements Renderer {
  public render(title: string, rows: Row[]): string {
    return JSON.stringify({ title, rows });
  }
}

class CsvRenderer implements Renderer {
  public render(title: string, rows: Row[]): string {
    if (rows.length === 0) {
      return `# ${title}\n(empty)`;
    }
    const headers: string[] = Object.keys(rows[0]);
    const lines: string[] = rows.map((r: Row): string => headers.map((h: string): string => String(r[h])).join(","));
    return [`# ${title}`, headers.join(","), ...lines].join("\n");
  }
}

class TableRenderer implements Renderer {
  public render(title: string, rows: Row[]): string {
    const body: string = rows
      .map((r: Row): string => Object.values(r).map((v): string => String(v).padEnd(12)).join("| "))
      .join("\n");
    return `${title}\n${"-".repeat(title.length)}\n${body}`;
  }
}

// --- Abstraction: WHAT data goes into the report ---
export abstract class Report {
  constructor(protected readonly renderer: Renderer) {}

  protected abstract title(): string;
  protected abstract rows(): Row[];

  public output(): string {
    return this.renderer.render(this.title(), this.rows());
  }
}

class SalesReport extends Report {
  protected title(): string {
    return "Sales by region";
  }
  protected rows(): Row[] {
    return [
      { region: "North", revenue: 120_000 },
      { region: "South", revenue: 98_500 },
    ];
  }
}

class InventoryReport extends Report {
  protected title(): string {
    return "Low stock";
  }
  protected rows(): Row[] {
    return [
      { sku: "p1", qty: 3 },
      { sku: "p7", qty: 1 },
    ];
  }
}

// ---- Demo ----

console.log(new SalesReport(new CsvRenderer()).output());
console.log("");
console.log(new SalesReport(new TableRenderer()).output());
console.log("");
console.log(new InventoryReport(new JsonRenderer()).output());
console.log("");
console.log(new InventoryReport(new TableRenderer()).output());
