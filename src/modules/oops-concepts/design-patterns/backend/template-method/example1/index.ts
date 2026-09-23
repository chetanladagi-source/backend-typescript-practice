// Template Method — Example 1: an ETL import pipeline.
// The sequence is fixed; only parsing and validation differ per format.

export interface ImportRow {
  [key: string]: string;
}

export abstract class DataImporter {
  // THE TEMPLATE METHOD. Subclasses must not override this.
  public run(raw: string): void {
    console.log(`--- ${this.constructor.name} ---`);
    const rows: ImportRow[] = this.parse(raw);
    const valid: ImportRow[] = rows.filter((r: ImportRow): boolean => this.isValid(r));
    this.load(valid);
    this.onFinished(rows.length, valid.length); // hook
  }

  // Abstract step: every format must supply its own parser.
  protected abstract parse(raw: string): ImportRow[];

  // Hook with a default: override only if the format needs stricter rules.
  protected isValid(row: ImportRow): boolean {
    return Object.keys(row).length > 0;
  }

  // Shared step: identical for every format, so it lives here.
  protected load(rows: ImportRow[]): void {
    rows.forEach((row: ImportRow): void => console.log(`  [db] insert ${JSON.stringify(row)}`));
  }

  // Hook with an empty-ish default.
  protected onFinished(total: number, loaded: number): void {
    console.log(`  imported ${loaded}/${total} rows`);
  }
}

class CsvImporter extends DataImporter {
  protected parse(raw: string): ImportRow[] {
    const [header, ...lines] = raw.trim().split("\n");
    const keys: string[] = header.split(",");
    return lines.map((line: string): ImportRow => {
      const values: string[] = line.split(",");
      return Object.fromEntries(keys.map((k: string, i: number): [string, string] => [k, values[i] ?? ""]));
    });
  }

  // Override the hook: CSV exports often contain blank trailing rows.
  protected isValid(row: ImportRow): boolean {
    return super.isValid(row) && row.email !== "";
  }
}

class JsonImporter extends DataImporter {
  protected parse(raw: string): ImportRow[] {
    return JSON.parse(raw) as ImportRow[];
  }

  // Override the other hook to add format-specific reporting.
  protected onFinished(total: number, loaded: number): void {
    super.onFinished(total, loaded);
    if (loaded < total) {
      console.log(`  [alert] ${total - loaded} malformed JSON records skipped`);
    }
  }
}

// ---- Demo ----

new CsvImporter().run("name,email\nAda,ada@example.com\nGhost,\nGrace,grace@example.com");

new JsonImporter().run('[{"name":"Linus","email":"linus@example.com"},{}]');
