// Memento — Example 2: form autosave with a capped history.
// Shows the memory trade-off that real implementations have to make.

export interface DraftMemento {
  readonly savedAt: string;
}

class FormSnapshot implements DraftMemento {
  constructor(
    public readonly savedAt: string,
    private readonly fields: Map<string, string>,
  ) {}

  public getFields(): Map<string, string> {
    // Hand back a copy so the caller cannot mutate the snapshot through the reference.
    return new Map(this.fields);
  }
}

// Originator
class ApplicationForm {
  private readonly fields: Map<string, string> = new Map<string, string>();

  public set(field: string, value: string): void {
    this.fields.set(field, value);
  }

  // Deep copy on save, or the "snapshot" would keep changing with the form.
  public save(savedAt: string): DraftMemento {
    return new FormSnapshot(savedAt, new Map(this.fields));
  }

  public restore(memento: DraftMemento): void {
    if (!(memento instanceof FormSnapshot)) {
      throw new Error("unknown memento type");
    }
    this.fields.clear();
    memento.getFields().forEach((v: string, k: string): void => {
      this.fields.set(k, v);
    });
  }

  public summary(): string {
    return [...this.fields].map(([k, v]: [string, string]): string => `${k}=${v}`).join(", ") || "(empty)";
  }
}

// Caretaker with a cap: unbounded history is the standard Memento memory leak.
class AutoSaver {
  private readonly drafts: DraftMemento[] = [];

  constructor(private readonly maxDrafts: number = 3) {}

  public keep(memento: DraftMemento): void {
    this.drafts.push(memento);
    if (this.drafts.length > this.maxDrafts) {
      const dropped: DraftMemento | undefined = this.drafts.shift();
      console.log(`  [autosave] evicted oldest draft "${dropped?.savedAt}"`);
    }
  }

  public available(): string[] {
    return this.drafts.map((d: DraftMemento): string => d.savedAt);
  }

  public find(savedAt: string): DraftMemento | undefined {
    return this.drafts.find((d: DraftMemento): boolean => d.savedAt === savedAt);
  }
}

// ---- Demo ----

const form: ApplicationForm = new ApplicationForm();
const autosave: AutoSaver = new AutoSaver(3);

form.set("name", "Ada");
autosave.keep(form.save("10:00"));

form.set("email", "ada@example.com");
autosave.keep(form.save("10:05"));

form.set("role", "Backend Engineer");
autosave.keep(form.save("10:10"));

form.set("role", "Staff Engineer");
autosave.keep(form.save("10:15")); // pushes 10:00 out

console.log("current:", form.summary());
console.log("drafts kept:", autosave.available());

console.log("--- restoring the 10:05 draft ---");
const draft: DraftMemento | undefined = autosave.find("10:05");
if (draft !== undefined) {
  form.restore(draft);
}
console.log("current:", form.summary());

console.log("--- the 10:00 draft is gone ---");
console.log("found:", autosave.find("10:00"));
