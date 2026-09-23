// Memento (frontend) — Example 2: a multi-step wizard.
// Back must restore exactly what the user typed, and a crash must not lose the draft.

type StepData = Record<string, string>;

interface WizardSnapshot {
  step: number;
  data: StepData;
  savedAt: string;
}

// Stands in for localStorage.
const storage: Map<string, string> = new Map<string, string>();

export class Wizard {
  private step: number = 0;
  private data: StepData = {};
  private readonly steps: string[] = ["account", "address", "payment", "review"];
  // Caretaker: one snapshot per completed step.
  private readonly history: WizardSnapshot[] = [];

  public fill(field: string, value: string): void {
    this.data[field] = value;
  }

  private snapshot(): WizardSnapshot {
    return { step: this.step, data: { ...this.data }, savedAt: `t${this.history.length}` };
  }

  public next(): void {
    this.history.push(this.snapshot());
    this.step += 1;
    this.autosave();
    console.log(`  -> step ${this.step} (${this.steps[this.step] ?? "done"}) data=${JSON.stringify(this.data)}`);
  }

  public back(): void {
    const previous: WizardSnapshot | undefined = this.history.pop();
    if (previous === undefined) {
      console.log("  already at the first step");
      return;
    }
    // Restoring `data` too is what makes this Memento rather than just a step counter.
    this.step = previous.step;
    this.data = { ...previous.data };
    console.log(`  <- step ${this.step} (${this.steps[this.step]}) data=${JSON.stringify(this.data)}`);
  }

  private autosave(): void {
    storage.set("wizard-draft", JSON.stringify(this.snapshot()));
  }

  public static recover(): Wizard | undefined {
    const raw: string | undefined = storage.get("wizard-draft");
    if (raw === undefined) {
      return undefined;
    }
    const snapshot: WizardSnapshot = JSON.parse(raw) as WizardSnapshot;
    const wizard: Wizard = new Wizard();
    wizard.step = snapshot.step;
    wizard.data = snapshot.data;
    return wizard;
  }

  public describe(): string {
    return `step ${this.step} (${this.steps[this.step] ?? "done"}) data=${JSON.stringify(this.data)}`;
  }
}

// ---- Demo ----

const wizard: Wizard = new Wizard();

console.log("step 0 (account)");
wizard.fill("email", "ada@example.com");
wizard.next();

wizard.fill("city", "Bengaluru");
wizard.fill("postcode", "560001");
wizard.next();

wizard.fill("card", "**** 4242");
wizard.next();

console.log("\nuser clicks Back twice to fix the address:");
wizard.back();
wizard.back();

console.log("\nthey change the city and go forward again:");
wizard.fill("city", "Mysuru");
wizard.next();
wizard.next();

console.log("\n--- the tab crashes ---");
const recovered: Wizard | undefined = Wizard.recover();
console.log("recovered draft:", recovered?.describe());
