# Composite (Structural)

**Intent:** compose objects into tree structures, then let client code treat individual objects
(leaves) and groups (composites) **uniformly**.

## The core move

Leaf and Composite implement the **same interface**. A `Folder` is a `Node`, a `File` is a `Node`,
and `folder.size()` just sums `child.size()` for every child — without caring which kind each child
is. Recursion does the rest.

```
Component (interface)
├── Leaf         — does the real work
└── Composite    — holds Component[] and delegates to them
```

## When to use

- Anything that is naturally a tree: file systems, org charts, menus, permission groups, nested
  UI, category hierarchies, bundled products.
- Client code is full of `if (isGroup) { loop } else { single }`. That branching is the smell
  Composite removes.

## Trade-offs

- The shared interface tends to become too general. `File.add(child)` makes no sense — you either
  throw (runtime error, GoF's "transparent" version) or only put `add` on Composite (type-safe
  "safe" version, but clients must then distinguish the two). There is no free lunch; say so in an
  interview.
- Deep trees mean deep recursion. Watch the stack on unbounded user-generated hierarchies.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | File system: files and folders, recursive size |
| `example2` | Org chart: employees and managers, recursive salary cost |
| `example3` | Cart with nested bundles, recursive pricing with a bundle discount |

## Interview questions

- **Transparent vs safe Composite?** Above. Transparent puts child-management on the component
  interface (uniform, but leaves must reject it); safe puts it only on Composite (type-safe, less
  uniform).
- **Composite vs Decorator?** Structurally similar — both wrap the same interface. Decorator wraps
  exactly **one** child to add behaviour; Composite holds **many** to form a tree.
- **Where have you used it?** The DOM, React element trees, Express router mounting, any
  `menu -> submenu` model.
