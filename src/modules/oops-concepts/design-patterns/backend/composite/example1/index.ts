// Composite — Example 1: a file system tree.
// A Folder is used exactly like a File, which is the whole point.

export interface FsNode {
  name: string;
  sizeInKb(): number;
  print(indent?: string): void;
}

// Leaf
class FileNode implements FsNode {
  constructor(public readonly name: string, private readonly kb: number) {}

  public sizeInKb(): number {
    return this.kb;
  }

  public print(indent: string = ""): void {
    console.log(`${indent}${this.name} (${this.kb}kb)`);
  }
}

// Composite
class FolderNode implements FsNode {
  private readonly children: FsNode[] = [];

  constructor(public readonly name: string) {}

  public add(child: FsNode): this {
    this.children.push(child);
    return this;
  }

  // Recursion: it never asks whether a child is a file or a folder.
  public sizeInKb(): number {
    return this.children.reduce((total: number, child: FsNode): number => total + child.sizeInKb(), 0);
  }

  public print(indent: string = ""): void {
    console.log(`${indent}${this.name}/ (${this.sizeInKb()}kb)`);
    this.children.forEach((child: FsNode): void => child.print(`${indent}  `));
  }
}

// ---- Demo ----

const root: FolderNode = new FolderNode("project")
  .add(new FileNode("package.json", 2))
  .add(new FileNode("README.md", 8))
  .add(
    new FolderNode("src")
      .add(new FileNode("app.ts", 12))
      .add(new FolderNode("routes").add(new FileNode("users.ts", 5)).add(new FileNode("orders.ts", 7))),
  );

root.print();

// The client function takes FsNode, so it works on a single file or a whole tree.
function report(node: FsNode): void {
  console.log(`${node.name} => ${node.sizeInKb()}kb`);
}

console.log("--- uniform treatment ---");
report(root);
report(new FileNode("logo.png", 340));
