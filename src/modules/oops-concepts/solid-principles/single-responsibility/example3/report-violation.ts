// God class for report generation, kept as the "before" picture.

export interface SalesRow {
  region: string;
  amount: number;
}

// SRP violation: data access, formatting and export writing sit in one class.
export class ReportGod {
  private readonly exports: Map<string, string> = new Map<string, string>();

  public generate(fileName: string): void {
    const rows: SalesRow[] = [
      { region: "north", amount: 1200 },
      { region: "south", amount: 800 }
    ];
    console.log("[god] queried sales table, rows:", rows.length);

    let csv: string = "region,amount\n";
    for (const row of rows) {
      csv += row.region + "," + row.amount.toFixed(2) + "\n";
    }

    this.exports.set(fileName, csv);
    console.log("[god] wrote export", fileName, "bytes:", csv.length);
  }

  public read(fileName: string): string {
    return this.exports.get(fileName) ?? "";
  }
}
