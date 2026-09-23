// Iterator (generic) — Example 1: walk an org chart with `for...of`.

interface Person {
  name: string;
  role: string;
  reports: Person[];
}

// The COLLECTION. Implementing Symbol.iterator makes it a first-class citizen of
// the language: for...of, spread, Array.from, destructuring all work.
export class OrgChart implements Iterable<Person> {
  constructor(private readonly root: Person) {}

  // Depth-first, using a generator so we don't need a manual stack + next() method.
  public *[Symbol.iterator](): Generator<Person> {
    yield* this.walk(this.root);
  }

  private *walk(node: Person): Generator<Person> {
    yield node;
    for (const report of node.reports) {
      yield* this.walk(report);
    }
  }

  // Second traversal: leaves only. Different name, same protocol.
  public *leaves(): Generator<Person> {
    for (const p of this) {
      if (p.reports.length === 0) {
        yield p;
      }
    }
  }
}

// ---- Demo ----

const chart: OrgChart = new OrgChart({
  name: "Hopper",
  role: "CEO",
  reports: [
    {
      name: "Ada",
      role: "VP Eng",
      reports: [
        { name: "Linus", role: "Engineer", reports: [] },
        { name: "Radia", role: "Engineer", reports: [] },
      ],
    },
    {
      name: "Grace",
      role: "VP Design",
      reports: [{ name: "Yves", role: "Designer", reports: [] }],
    },
  ],
});

// Because it implements Symbol.iterator, the whole language cooperates.
console.log("everyone (for...of):");
for (const p of chart) {
  console.log(`  ${p.role.padEnd(10)} ${p.name}`);
}

console.log("\neveryone (spread + map):");
console.log("  " + [...chart].map((p: Person): string => p.name).join(", "));

console.log("\nleaves only (second traversal):");
for (const p of chart.leaves()) {
  console.log(`  ${p.name}`);
}

// The point: the caller writes ordinary iteration code. HOW the tree is walked
// lives inside OrgChart, and can change (BFS, filtered, paginated) without breaking any caller.

// A generator is LAZY. Stop early and the rest is never computed:
let firstEngineer: Person | undefined;
for (const p of chart) {
  if (p.role === "Engineer") {
    firstEngineer = p;
    break; // suspends the generator; the remaining subtree is never visited
  }
}
console.log(`\nfirst engineer found: ${firstEngineer?.name}`);
