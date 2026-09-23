// Chain of Responsibility (frontend) — Example 1: DOM-style event bubbling.
// The chain is the ancestor path, built at dispatch time rather than wired up front.

export interface UiEvent {
  type: string;
  target: string;
  propagationStopped: boolean;
  defaultPrevented: boolean;
}

type EventHandler = (event: UiEvent, node: Node) => void;

class Node {
  public parent?: Node;
  private readonly children: Node[] = [];
  private readonly handlers: Map<string, EventHandler> = new Map<string, EventHandler>();

  constructor(public readonly name: string) {}

  public append(...nodes: Node[]): Node {
    nodes.forEach((n: Node): void => {
      n.parent = this;
      this.children.push(n);
    });
    return this;
  }

  public on(type: string, handler: EventHandler): Node {
    this.handlers.set(type, handler);
    return this;
  }

  public find(name: string): Node | undefined {
    if (this.name === name) {
      return this;
    }
    for (const child of this.children) {
      const hit: Node | undefined = child.find(name);
      if (hit !== undefined) {
        return hit;
      }
    }
    return undefined;
  }

  // Bubble: run this node's handler, then hand off to the parent unless stopped.
  public dispatch(event: UiEvent): void {
    const handler: EventHandler | undefined = this.handlers.get(event.type);
    if (handler !== undefined) {
      handler(event, this);
    }
    if (event.propagationStopped) {
      console.log(`  ...propagation stopped at <${this.name}>`);
      return;
    }
    this.parent?.dispatch(event);
  }
}

function click(root: Node, targetName: string): void {
  const target: Node | undefined = root.find(targetName);
  if (target === undefined) {
    return;
  }
  console.log(`\nclick on <${targetName}>`);
  target.dispatch({ type: "click", target: targetName, propagationStopped: false, defaultPrevented: false });
}

// ---- Demo ----

const deleteBtn: Node = new Node("delete-button").on("click", (e: UiEvent): void => {
  console.log("  <delete-button> deleting the row");
  // This row's delete must not also select the row.
  e.propagationStopped = true;
});

const link: Node = new Node("row-link").on("click", (e: UiEvent): void => {
  console.log("  <row-link> intercepting for client-side routing");
  e.defaultPrevented = true; // act, but let the chain continue
});

const row: Node = new Node("row").on("click", (): void => console.log("  <row> selecting row"));
const table: Node = new Node("table").on("click", (): void => console.log("  <table> clearing other selections"));
const page: Node = new Node("page").on("click", (e: UiEvent): void =>
  console.log(`  <page> analytics: click on ${e.target}, defaultPrevented=${e.defaultPrevented}`),
);

page.append(table.append(row.append(link, deleteBtn, new Node("row-text"))));

// 1. A node with no handler still bubbles.
click(page, "row-text");

// 2. A node that acts and passes the event along.
click(page, "row-link");

// 3. A node that claims the event and ends the chain.
click(page, "delete-button");
