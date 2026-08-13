// Only supplies report rows from the simulated data store.

import { SalesRow } from "./report-violation";

export class SalesDataSource {
  private readonly table: SalesRow[] = [
    { region: "north", amount: 1200 },
    { region: "south", amount: 800 }
  ];

  public fetch(): SalesRow[] {
    console.log("[data-source] queried sales table, rows:", this.table.length);
    return [...this.table];
  }
}
