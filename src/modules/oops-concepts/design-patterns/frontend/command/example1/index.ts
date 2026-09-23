// Command (frontend) — Example 1: a canvas editor with undo/redo.

interface Shape {
  id: string;
  kind: string;
  x: number;
  y: number;
  color: string;
}

// Receiver
class Canvas {
  private readonly shapes: Map<string, Shape> = new Map<string, Shape>();

  public add(shape: Shape): void {
    this.shapes.set(shape.id, shape);
  }
  public remove(id: string): void {
    this.shapes.delete(id);
  }
  public get(id: string): Shape | undefined {
    return this.shapes.get(id);
  }
  public update(id: string, patch: Partial<Shape>): void {
    const shape: Shape | undefined = this.shapes.get(id);
    if (shape !== undefined) {
      this.shapes.set(id, { ...shape, ...patch });
    }
  }
  public describe(): string {
    if (this.shapes.size === 0) {
      return "(empty canvas)";
    }
    return [...this.shapes.values()]
      .map((s: Shape): string => `${s.kind}#${s.id}(${s.x},${s.y},${s.color})`)
      .join(" ");
  }
}

export interface EditorCommand {
  readonly label: string;
  execute(): void;
  undo(): void;
}

class AddShapeCommand implements EditorCommand {
  public readonly label: string;

  constructor(private readonly canvas: Canvas, private readonly shape: Shape) {
    this.label = `add ${shape.kind}#${shape.id}`;
  }

  public execute(): void {
    this.canvas.add(this.shape);
  }
  public undo(): void {
    this.canvas.remove(this.shape.id);
  }
}

class MoveShapeCommand implements EditorCommand {
  public readonly label: string;
  private previous?: { x: number; y: number };

  constructor(
    private readonly canvas: Canvas,
    private readonly id: string,
    private readonly to: { x: number; y: number },
  ) {
    this.label = `move #${id} to (${to.x},${to.y})`;
  }

  public execute(): void {
    const shape: Shape | undefined = this.canvas.get(this.id);
    if (shape !== undefined) {
      // Capture the old position so undo can restore it.
      this.previous ??= { x: shape.x, y: shape.y };
      this.canvas.update(this.id, this.to);
    }
  }

  public undo(): void {
    if (this.previous !== undefined) {
      this.canvas.update(this.id, this.previous);
    }
  }
}

class RecolorCommand implements EditorCommand {
  public readonly label: string;
  private previous?: string;

  constructor(private readonly canvas: Canvas, private readonly id: string, private readonly color: string) {
    this.label = `recolor #${id} to ${color}`;
  }

  public execute(): void {
    this.previous ??= this.canvas.get(this.id)?.color;
    this.canvas.update(this.id, { color: this.color });
  }
  public undo(): void {
    if (this.previous !== undefined) {
      this.canvas.update(this.id, { color: this.previous });
    }
  }
}

// Invoker
class Editor {
  private readonly undoStack: EditorCommand[] = [];
  private readonly redoStack: EditorCommand[] = [];

  constructor(private readonly canvas: Canvas) {}

  public run(command: EditorCommand): void {
    command.execute();
    this.undoStack.push(command);
    this.redoStack.length = 0; // a new action invalidates redo
    this.log(`did   ${command.label}`);
  }

  public undo(): void {
    const command: EditorCommand | undefined = this.undoStack.pop();
    if (command === undefined) {
      console.log("  nothing to undo");
      return;
    }
    command.undo();
    this.redoStack.push(command);
    this.log(`undo  ${command.label}`);
  }

  public redo(): void {
    const command: EditorCommand | undefined = this.redoStack.pop();
    if (command === undefined) {
      console.log("  nothing to redo");
      return;
    }
    command.execute();
    this.undoStack.push(command);
    this.log(`redo  ${command.label}`);
  }

  private log(action: string): void {
    console.log(`  ${action.padEnd(28)} | ${this.canvas.describe()}`);
  }
}

// ---- Demo ----

const canvas: Canvas = new Canvas();
const editor: Editor = new Editor(canvas);

editor.run(new AddShapeCommand(canvas, { id: "1", kind: "rect", x: 0, y: 0, color: "red" }));
editor.run(new AddShapeCommand(canvas, { id: "2", kind: "circle", x: 10, y: 10, color: "blue" }));
editor.run(new MoveShapeCommand(canvas, "1", { x: 50, y: 20 }));
editor.run(new RecolorCommand(canvas, "2", "green"));

console.log("\nCmd+Z three times:");
editor.undo();
editor.undo();
editor.undo();

console.log("\nCmd+Shift+Z twice:");
editor.redo();
editor.redo();

console.log("\na new action clears the redo stack:");
editor.undo();
editor.run(new RecolorCommand(canvas, "1", "purple"));
editor.redo();
