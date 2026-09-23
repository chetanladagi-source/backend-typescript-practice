// Iterator — Example 3: generators.
// `function*` builds the iterator for you; `yield*` makes recursive traversal trivial.

export interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

// 1. Recursive tree traversal. Two orders, four lines each.
function* inOrder(node: TreeNode | undefined): Generator<number> {
  if (node === undefined) {
    return;
  }
  yield* inOrder(node.left); // yield* delegates to another generator
  yield node.value;
  yield* inOrder(node.right);
}

function* preOrder(node: TreeNode | undefined): Generator<number> {
  if (node === undefined) {
    return;
  }
  yield node.value;
  yield* preOrder(node.left);
  yield* preOrder(node.right);
}

// 2. Chunking a stream of log lines without holding it all in memory.
function* chunk<T>(items: Iterable<T>, size: number): Generator<T[]> {
  let batch: T[] = [];
  for (const item of items) {
    batch.push(item);
    if (batch.length === size) {
      yield batch;
      batch = [];
    }
  }
  if (batch.length > 0) {
    yield batch; // the final partial batch
  }
}

// 3. An infinite sequence. Impossible with an array, natural with a generator.
function* idSequence(prefix: string): Generator<string> {
  let n: number = 1;
  while (true) {
    yield `${prefix}-${String(n++).padStart(4, "0")}`;
  }
}

// ---- Demo ----

const tree: TreeNode = {
  value: 8,
  left: { value: 3, left: { value: 1 }, right: { value: 6 } },
  right: { value: 10, right: { value: 14 } },
};

console.log("in-order :", [...inOrder(tree)].join(" "));
console.log("pre-order:", [...preOrder(tree)].join(" "));

console.log("--- chunking log lines into batches of 3 ---");
const logs: string[] = ["boot", "connect db", "listen 3000", "req /users", "req /orders", "shutdown"];
for (const batch of chunk(logs, 3)) {
  console.log("  batch:", batch);
}

console.log("--- infinite sequence, taken lazily ---");
const ids: Generator<string> = idSequence("INV");
console.log("  ", ids.next().value, ids.next().value, ids.next().value);

// Generators are one-shot: they resume where they stopped rather than restarting.
console.log("  later:", ids.next().value);
