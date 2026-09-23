// Command — Example 1: undoable edits to a user record.

// Receiver: the thing being changed.
class UserRecord {
  private readonly fields: Map<string, string> = new Map<string, string>([
    ["name", "Ada"],
    ["email", "ada@example.com"],
    ["role", "viewer"],
  ]);

  public get(key: string): string {
    return this.fields.get(key) ?? "";
  }

  public set(key: string, value: string): void {
    this.fields.set(key, value);
  }

  public snapshot(): string {
    return [...this.fields].map(([k, v]: [string, string]): string => `${k}=${v}`).join(" ");
  }
}

export interface Command {
  readonly label: string;
  execute(): void;
  undo(): void;
}

class SetFieldCommand implements Command {
  public readonly label: string;
  private previous: string = "";

  constructor(
    private readonly record: UserRecord,
    private readonly field: string,
    private readonly value: string,
  ) {
    this.label = `set ${field}="${value}"`;
  }

  public execute(): void {
    // Capture the old value so undo is possible. (This is Memento inside Command.)
    this.previous = this.record.get(this.field);
    this.record.set(this.field, this.value);
  }

  public undo(): void {
    this.record.set(this.field, this.previous);
  }
}

// Invoker: owns the history and knows nothing about what the commands actually do.
class EditHistory {
  private readonly done: Command[] = [];
  private readonly undone: Command[] = [];

  public run(command: Command): void {
    command.execute();
    this.done.push(command);
    this.undone.length = 0; // a new action invalidates the redo stack
    console.log(`  did:  ${command.label}`);
  }

  public undo(): void {
    const command: Command | undefined = this.done.pop();
    if (command === undefined) {
      console.log("  nothing to undo");
      return;
    }
    command.undo();
    this.undone.push(command);
    console.log(`  undid: ${command.label}`);
  }

  public redo(): void {
    const command: Command | undefined = this.undone.pop();
    if (command === undefined) {
      console.log("  nothing to redo");
      return;
    }
    command.execute();
    this.done.push(command);
    console.log(`  redid: ${command.label}`);
  }
}

// ---- Demo ----

const user: UserRecord = new UserRecord();
const history: EditHistory = new EditHistory();

console.log("start:", user.snapshot());

history.run(new SetFieldCommand(user, "role", "admin"));
history.run(new SetFieldCommand(user, "email", "ada@newmail.com"));
console.log("now:  ", user.snapshot());

history.undo();
console.log("now:  ", user.snapshot());

history.undo();
console.log("now:  ", user.snapshot());

history.redo();
console.log("now:  ", user.snapshot());

history.undo();
history.undo();
console.log("end:  ", user.snapshot());
