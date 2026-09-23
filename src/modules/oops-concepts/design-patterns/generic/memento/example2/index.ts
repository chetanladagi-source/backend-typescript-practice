// Memento (generic) — Example 2: undo on an employee timesheet draft.

interface Sheet {
  monday: number;
  tuesday: number;
  wednesday: number;
  project: string;
}

export class TimesheetMemento {
  constructor(private readonly snapshot: Sheet, public readonly label: string) {}
  public restoreInto(): Sheet {
    return { ...this.snapshot };
  }
}

class Timesheet {
  private state: Sheet = { monday: 0, tuesday: 0, wednesday: 0, project: "" };

  public setProject(name: string): void {
    this.state.project = name;
  }
  public log(day: keyof Omit<Sheet, "project">, hours: number): void {
    this.state[day] = hours;
  }
  public save(label: string): TimesheetMemento {
    return new TimesheetMemento({ ...this.state }, label);
  }
  public restore(memento: TimesheetMemento): void {
    this.state = memento.restoreInto();
  }
  public describe(): string {
    return `${this.state.project || "(no project)"}  M${this.state.monday} T${this.state.tuesday} W${this.state.wednesday}`;
  }
}

class History {
  private readonly stack: TimesheetMemento[] = [];
  public push(m: TimesheetMemento): void {
    this.stack.push(m);
  }
  public pop(): TimesheetMemento | undefined {
    return this.stack.pop();
  }
}

// ---- Demo ----

const sheet: Timesheet = new Timesheet();
const history: History = new History();

function step(label: string, change: () => void): void {
  history.push(sheet.save(label));
  change();
  console.log(`${label.padEnd(22)} ${sheet.describe()}`);
}

step("pick project", (): void => sheet.setProject("payments"));
step("monday 8h", (): void => sheet.log("monday", 8));
step("tuesday 8h", (): void => sheet.log("tuesday", 8));
step("oops wednesday 12h", (): void => sheet.log("wednesday", 12));

console.log("\nundo last two:");
for (let i = 0; i < 2; i++) {
  const m: TimesheetMemento | undefined = history.pop();
  if (m === undefined) {
    break;
  }
  sheet.restore(m);
  console.log(`  back to "${m.label}" → ${sheet.describe()}`);
}
