// Composite (frontend) — Example 1: a mini virtual DOM.
// A text node and an element node both satisfy VNode, so render() is uniform.

export interface VNode {
  render(indent?: string): string;
  countNodes(): number;
  findByTag(tag: string): VNode[];
}

// Leaf
export class TextNode implements VNode {
  constructor(private readonly text: string) {}

  public render(indent: string = ""): string {
    return `${indent}${this.text}`;
  }
  public countNodes(): number {
    return 1;
  }
  public findByTag(): VNode[] {
    return [];
  }
}

// Composite
export class ElementNode implements VNode {
  private readonly children: VNode[] = [];

  constructor(
    public readonly tag: string,
    private readonly attrs: Record<string, string> = {},
  ) {}

  public append(...children: VNode[]): this {
    this.children.push(...children);
    return this;
  }

  public render(indent: string = ""): string {
    const attrs: string = Object.entries(this.attrs)
      .map(([k, v]: [string, string]): string => ` ${k}="${v}"`)
      .join("");

    // Void elements have no children and no closing tag.
    if (this.children.length === 0) {
      return `${indent}<${this.tag}${attrs}></${this.tag}>`;
    }
    const inner: string = this.children.map((c: VNode): string => c.render(`${indent}  `)).join("\n");
    return `${indent}<${this.tag}${attrs}>\n${inner}\n${indent}</${this.tag}>`;
  }

  // Recursive operations come free once the tree exists.
  public countNodes(): number {
    return this.children.reduce((n: number, c: VNode): number => n + c.countNodes(), 1);
  }

  public findByTag(tag: string): VNode[] {
    const here: VNode[] = this.tag === tag ? [this] : [];
    return this.children.reduce((found: VNode[], c: VNode): VNode[] => [...found, ...c.findByTag(tag)], here);
  }
}

// Tiny helpers, the way frameworks expose them.
export const h = (tag: string, attrs: Record<string, string> = {}, ...children: VNode[]): ElementNode =>
  new ElementNode(tag, attrs).append(...children);
export const t = (text: string): TextNode => new TextNode(text);

// ---- Demo ----

const page: VNode = h(
  "article",
  { class: "post" },
  h("h1", {}, t("Design patterns on the frontend")),
  h(
    "section",
    { class: "body" },
    h("p", {}, t("A composite treats leaves and branches alike.")),
    h("ul", {}, h("li", {}, t("The DOM")), h("li", {}, t("Virtual DOM")), h("li", {}, t("Menus"))),
  ),
  h("footer", {}, t("Posted 2031")),
);

console.log(page.render());

console.log("\ntotal nodes:", page.countNodes());
console.log("list items found:", page.findByTag("li").length);

// A single leaf is a valid tree, so rendering code needs no special case.
function mount(node: VNode): void {
  console.log(`\nmounting a subtree of ${node.countNodes()} node(s):`);
  console.log(node.render());
}

mount(t("just a text node"));
mount(h("hr"));
