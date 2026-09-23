// Iterator (frontend) — Example 2: walking a component tree with generators.
// `function*` gives you a lazy iterator without hand-writing next() and a stack.

interface ComponentNode {
  tag: string;
  props: { disabled?: boolean; tabIndex?: number };
  children: ComponentNode[];
}

function node(tag: string, props: ComponentNode["props"], ...children: ComponentNode[]): ComponentNode {
  return { tag, props, children };
}

// Depth-first pre-order walk. `yield*` recurses; the whole traversal is four lines.
export function* walk(root: ComponentNode): Generator<ComponentNode> {
  visited += 1;
  yield root;
  for (const child of root.children) {
    yield* walk(child);
  }
}

// Generators compose: this filters a stream without materialising either list.
function* focusable(root: ComponentNode): Generator<ComponentNode> {
  const tags: string[] = ["button", "input", "a", "select"];
  for (const n of walk(root)) {
    if (tags.includes(n.tag) && n.props.disabled !== true) {
      yield n;
    }
  }
}

let visited: number = 0;

// ---- Demo ----

const modal: ComponentNode = node(
  "dialog",
  {},
  node("header", {}, node("h2", {}), node("button", { tabIndex: 0 })),
  node(
    "form",
    {},
    node("fieldset", {}, node("input", {}), node("input", { disabled: true }), node("select", {})),
    node("footer", {}, node("button", { disabled: true }), node("button", {}), node("a", {})),
  ),
  node("aside", {}, node("p", {}), node("a", {})),
);

visited = 0;
const all: ComponentNode[] = [...walk(modal)];
console.log(`tree has ${all.length} nodes`);

visited = 0;
const trap: ComponentNode[] = [...focusable(modal)];
console.log(`focus trap contains ${trap.length}: ${trap.map((n: ComponentNode): string => n.tag).join(", ")}`);
console.log(`nodes visited: ${visited}`);

// The point of laziness: stop as soon as you have what you need.
visited = 0;
let first: ComponentNode | undefined;
for (const n of focusable(modal)) {
  first = n;
  break; // abandons the generator mid-traversal
}
console.log(`\nfirst focusable is <${first?.tag}> after visiting only ${visited} nodes`);

// An eager version would have had to build the whole array first.
visited = 0;
const firstEager: ComponentNode | undefined = [...focusable(modal)][0];
console.log(`eager version found <${firstEager?.tag}> after visiting ${visited} nodes`);
