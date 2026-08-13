// Abstraction that every export format implements.

export interface ReportRow {
  id: number;
  name: string;
}

export interface ReportExporter {
  readonly format: string;
  export(rows: ReportRow[]): string;
}
