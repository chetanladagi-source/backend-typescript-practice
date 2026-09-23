// Factory Method — Example 3: upload parsers chosen by file type.
// Uses a registry instead of a switch, so adding a format never edits the factory.

export interface Parser {
  parse(raw: string): Record<string, string>[];
}

class CsvParser implements Parser {
  public parse(raw: string): Record<string, string>[] {
    const [header, ...rows] = raw.trim().split("\n");
    const keys: string[] = header.split(",");
    return rows.map((row: string): Record<string, string> => {
      const values: string[] = row.split(",");
      return Object.fromEntries(keys.map((k: string, i: number): [string, string] => [k, values[i] ?? ""]));
    });
  }
}

class JsonParser implements Parser {
  public parse(raw: string): Record<string, string>[] {
    return JSON.parse(raw) as Record<string, string>[];
  }
}

class XmlParser implements Parser {
  public parse(raw: string): Record<string, string>[] {
    // Deliberately naive; the point is the factory, not the XML.
    const matches: RegExpMatchArray[] = [...raw.matchAll(/<name>(.*?)<\/name>/g)];
    return matches.map((m: RegExpMatchArray): Record<string, string> => ({ name: m[1] }));
  }
}

// Registry: type -> how to build it. Open for extension, closed for modification.
const registry: Map<string, () => Parser> = new Map<string, () => Parser>([
  ["csv", (): Parser => new CsvParser()],
  ["json", (): Parser => new JsonParser()],
]);

function registerParser(type: string, factory: () => Parser): void {
  registry.set(type, factory);
}

function createParser(type: string): Parser {
  const factory: (() => Parser) | undefined = registry.get(type);
  if (factory === undefined) {
    throw new Error(`No parser registered for "${type}"`);
  }
  return factory();
}

// ---- Demo ----

console.log(createParser("csv").parse("name,role\nada,admin\ngrace,dev"));
console.log(createParser("json").parse('[{"name":"linus","role":"dev"}]'));

// A new format plugs itself in without the factory code changing at all.
registerParser("xml", (): Parser => new XmlParser());
console.log(createParser("xml").parse("<users><name>hopper</name><name>turing</name></users>"));

try {
  createParser("yaml");
} catch (err) {
  console.log("expected:", (err as Error).message);
}
