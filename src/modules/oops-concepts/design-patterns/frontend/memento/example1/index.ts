// Memento (frontend) — Example 1: snapshot undo for a canvas editor,
// with a bounded history so memory does not grow forever.

interface Shape {
  id: string;
  x: number;
  y: number;
}

// The memento. Opaque to the caretaker: it can hold it, but not read into it.
export class CanvasMemento {
  constructor(private readonly shapes: Shape[], public readonly label: string) {}

  // Only the originator is meant to call this.
  public restoreInto(): Shape[] {
    return structuredClone(this.shapes);
  }
}

// Originator
class CanvasDocument {
  private shapes: Shape[] = [];

  public add(shape: Shape): void {
    this.shapes.push(shape);
  }

  public move(id: string, dx: number, dy: number): void {
    const shape: Shape | undefined = this.shapes.find((s: Shape): boolean => s.id === id);
    if (shape !== undefined) {
      shape.x += dx;
      shape.y += dy;
    }
  }

  public save(label: string): CanvasMemento {
    // The deep copy is the whole point. Without it the memento aliases live
    // objects and every later mutation silently rewrites your history.
    return new CanvasMemento(structuredClone(this.shapes), label);
  }

  public restore(memento: CanvasMemento): void {
    this.shapes = memento.restoreInto();
  }

  public describe(): string {
    return this.shapes.map((s: Shape): string => `${s.id}(${s.x},${s.y})`).join(" ") || "(empty)";
  }
}

// Caretaker: holds mementos, never looks inside them.
class History {
  private readonly stack: CanvasMemento[] = [];

  constructor(private readonly limit: number) {}

  public push(memento: CanvasMemento): void {
    this.stack.push(memento);
    if (this.stack.length > this.limit) {
      // Oldest snapshot is dropped — bounded memory, at the cost of bounded undo.
      const dropped: CanvasMemento | undefined = this.stack.shift();
      console.log(`  (history full — dropped "${dropped?.label}")`);
    }
  }

  public pop(): CanvasMemento | undefined {
    return this.stack.pop();
  }

  public labels(): string {
    return this.stack.map((m: CanvasMemento): string => m.label).join(" < ");
  }
}

// ---- Demo ----

const doc: CanvasDocument = new CanvasDocument();
const history: History = new History(3);

function edit(label: string, change: () => void): void {
  history.push(doc.save(label)); // snapshot BEFORE the change
  change();
  console.log(`${label.padEnd(18)} ${doc.describe()}`);
}

edit("add rect", (): void => doc.add({ id: "r1", x: 0, y: 0 }));
edit("add circle", (): void => doc.add({ id: "c1", x: 10, y: 10 }));
edit("move rect", (): void => doc.move("r1", 30, 0));
edit("move circle", (): void => doc.move("c1", 5, 5));
edit("move rect again", (): void => doc.move("r1", 0, 40));

console.log("\nhistory holds:", history.labels());

console.log("\nCmd+Z:");
for (let i = 0; i < 4; i++) {
  const memento: CanvasMemento | undefined = history.pop();
  if (memento === undefined) {
    console.log("  history exhausted — the oldest edits can no longer be undone");
    break;
  }
  doc.restore(memento);
  console.log(`  back to "${memento.label}"  ${doc.describe()}`);
}
