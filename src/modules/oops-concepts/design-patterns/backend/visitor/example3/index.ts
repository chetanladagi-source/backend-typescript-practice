// Visitor — Example 3: the same problem solved with a discriminated union.
// In TypeScript this is usually the better tool. Know both, and know why.

// Elements are plain data with a literal `kind` field — no accept() anywhere.
export type FsEntry =
  | { kind: "file"; name: string; sizeKb: number }
  | { kind: "folder"; name: string; children: FsEntry[] }
  | { kind: "symlink"; name: string; target: string };

// An "operation" is just a function with a switch. TypeScript checks exhaustiveness:
// remove a case and the `never` assignment becomes a compile error.
function totalSizeKb(entry: FsEntry): number {
  switch (entry.kind) {
    case "file":
      return entry.sizeKb;
    case "folder":
      return entry.children.reduce((sum: number, c: FsEntry): number => sum + totalSizeKb(c), 0);
    case "symlink":
      return 0; // do not double-count the target
    default: {
      const exhaustive: never = entry;
      return exhaustive;
    }
  }
}

function describe(entry: FsEntry, indent: string = ""): string {
  switch (entry.kind) {
    case "file":
      return `${indent}${entry.name} (${entry.sizeKb}kb)`;
    case "folder":
      return [
        `${indent}${entry.name}/`,
        ...entry.children.map((c: FsEntry): string => describe(c, `${indent}  `)),
      ].join("\n");
    case "symlink":
      return `${indent}${entry.name} -> ${entry.target}`;
    default: {
      const exhaustive: never = entry;
      return exhaustive;
    }
  }
}

// Adding an operation is adding a function — exactly the Visitor benefit, no ceremony.
function findLargestFile(entry: FsEntry): { name: string; sizeKb: number } | undefined {
  switch (entry.kind) {
    case "file":
      return { name: entry.name, sizeKb: entry.sizeKb };
    case "folder":
      return entry.children
        .map(findLargestFile)
        .reduce(
          (
            best: { name: string; sizeKb: number } | undefined,
            candidate: { name: string; sizeKb: number } | undefined,
          ) => (candidate !== undefined && (best === undefined || candidate.sizeKb > best.sizeKb) ? candidate : best),
          undefined,
        );
    case "symlink":
      return undefined;
    default: {
      const exhaustive: never = entry;
      return exhaustive;
    }
  }
}

// ---- Demo ----

const tree: FsEntry = {
  kind: "folder",
  name: "project",
  children: [
    { kind: "file", name: "README.md", sizeKb: 8 },
    { kind: "symlink", name: "latest", target: "./v2" },
    {
      kind: "folder",
      name: "src",
      children: [
        { kind: "file", name: "app.ts", sizeKb: 12 },
        { kind: "file", name: "bundle.js", sizeKb: 940 },
      ],
    },
  ],
};

console.log(describe(tree));
console.log("total size:", totalSizeKb(tree) + "kb");
console.log("largest file:", findLargestFile(tree));
