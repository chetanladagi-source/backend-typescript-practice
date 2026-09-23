// Composite (frontend) — Example 2: a nested navigation menu.
// Permission filtering has to recurse, and empty groups must disappear.

export interface MenuNode {
  label: string;
  render(indent?: string): string;
  // Returns a filtered copy, or undefined if nothing survives.
  visibleFor(roles: string[]): MenuNode | undefined;
}

// Leaf: an actual link
export class MenuLink implements MenuNode {
  constructor(
    public readonly label: string,
    private readonly href: string,
    private readonly requiredRole?: string,
  ) {}

  public render(indent: string = ""): string {
    return `${indent}- ${this.label} (${this.href})`;
  }

  public visibleFor(roles: string[]): MenuNode | undefined {
    if (this.requiredRole !== undefined && !roles.includes(this.requiredRole)) {
      return undefined;
    }
    return this;
  }
}

// Composite: a group that can contain links and other groups
export class MenuGroup implements MenuNode {
  private readonly children: MenuNode[] = [];

  constructor(public readonly label: string, private readonly requiredRole?: string) {}

  public add(...children: MenuNode[]): this {
    this.children.push(...children);
    return this;
  }

  public render(indent: string = ""): string {
    const inner: string = this.children.map((c: MenuNode): string => c.render(`${indent}  `)).join("\n");
    return `${indent}+ ${this.label}\n${inner}`;
  }

  public visibleFor(roles: string[]): MenuNode | undefined {
    if (this.requiredRole !== undefined && !roles.includes(this.requiredRole)) {
      return undefined;
    }

    const kept: MenuNode[] = this.children
      .map((c: MenuNode): MenuNode | undefined => c.visibleFor(roles))
      .filter((c: MenuNode | undefined): c is MenuNode => c !== undefined);

    // An empty group would render as a dead dropdown, so drop it entirely.
    if (kept.length === 0) {
      return undefined;
    }
    return new MenuGroup(this.label, this.requiredRole).add(...kept);
  }
}

// ---- Demo ----

const nav: MenuGroup = new MenuGroup("Main").add(
  new MenuLink("Dashboard", "/"),
  new MenuGroup("Content").add(
    new MenuLink("Posts", "/posts"),
    new MenuLink("Drafts", "/drafts", "editor"),
    new MenuGroup("Moderation", "moderator").add(
      new MenuLink("Reports", "/reports"),
      new MenuLink("Banned users", "/banned"),
    ),
  ),
  new MenuGroup("Admin", "admin").add(
    new MenuLink("Billing", "/billing"),
    new MenuLink("Audit log", "/audit"),
  ),
);

const show = (label: string, roles: string[]): void => {
  console.log(`\n=== ${label} (roles: ${roles.join(", ") || "none"}) ===`);
  const visible: MenuNode | undefined = nav.visibleFor(roles);
  console.log(visible === undefined ? "(no menu items)" : visible.render());
};

show("full menu", ["admin", "editor", "moderator"]);
show("editor", ["editor"]);
show("plain viewer", []);
