// Memento — Example 1: text editor undo, with encapsulation genuinely enforced.

// What the caretaker is allowed to see: a label and nothing else.
export interface EditorMemento {
  readonly label: string;
}

// The real memento. Its state is private, so only the Editor can read it.
class EditorSnapshot implements EditorMemento {
  constructor(
    public readonly label: string,
    private readonly content: string,
    private readonly cursor: number,
  ) {}

  // Deliberately package-private in spirit: only Editor calls these.
  public getContent(): string {
    return this.content;
  }
  public getCursor(): number {
    return this.cursor;
  }
}

// Originator
class Editor {
  private content: string = "";
  private cursor: number = 0;

  public type(text: string): void {
    this.content = this.content.slice(0, this.cursor) + text + this.content.slice(this.cursor);
    this.cursor += text.length;
  }

  public moveCursorTo(position: number): void {
    this.cursor = Math.max(0, Math.min(position, this.content.length));
  }

  public deleteBack(count: number): void {
    const start: number = Math.max(0, this.cursor - count);
    this.content = this.content.slice(0, start) + this.content.slice(this.cursor);
    this.cursor = start;
  }

  public save(label: string): EditorMemento {
    return new EditorSnapshot(label, this.content, this.cursor);
  }

  public restore(memento: EditorMemento): void {
    if (!(memento instanceof EditorSnapshot)) {
      throw new Error("unknown memento type");
    }
    this.content = memento.getContent();
    this.cursor = memento.getCursor();
  }

  public render(): string {
    return `"${this.content}" (cursor at ${this.cursor})`;
  }
}

// Caretaker: holds history but cannot read what is inside a memento.
class History {
  private readonly stack: EditorMemento[] = [];

  public push(memento: EditorMemento): void {
    this.stack.push(memento);
    console.log(`  [history] saved "${memento.label}"`);
    // Note what the caretaker CANNOT do:
    // memento.getContent();  // not on EditorMemento — compile error
  }

  public pop(): EditorMemento | undefined {
    return this.stack.pop();
  }

  public labels(): string[] {
    return this.stack.map((m: EditorMemento): string => m.label);
  }
}

// ---- Demo ----

const editor: Editor = new Editor();
const history: History = new History();

editor.type("Hello");
history.push(editor.save("after hello"));

editor.type(", world");
history.push(editor.save("after world"));
console.log("now:", editor.render());

editor.deleteBack(7);
editor.type("!!!");
console.log("now:", editor.render());

console.log("saved states:", history.labels());

console.log("--- undo twice ---");
const first: EditorMemento | undefined = history.pop();
if (first !== undefined) {
  editor.restore(first);
  console.log("now:", editor.render());
}

const second: EditorMemento | undefined = history.pop();
if (second !== undefined) {
  editor.restore(second);
  console.log("now:", editor.render());
}
