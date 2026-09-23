# Example 1 — File system tree

**Problem:** computing a folder's size means walking an arbitrarily nested mix of files and
folders, and naive code is full of `if (isFolder)` branches.

**Pattern:** `FileNode` (leaf) and `FolderNode` (composite) both implement `FsNode`.
`FolderNode.sizeInKb()` just sums its children — it never checks what kind they are, and recursion
handles any depth.

**Note:** this is the "safe" variant — `add()` lives only on `FolderNode`, so you cannot add a child
to a file. The trade-off is that `report()` accepts `FsNode` but you need a `FolderNode` reference
to build the tree.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/composite/example1/index.ts`
