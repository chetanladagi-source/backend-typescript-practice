// Visitor (frontend) — Example 1: a rich-text document tree.
// The node classes never change. Every new export format is one new visitor.

export interface DocVisitor<R> {
  paragraph(node: Paragraph): R;
  text(node: TextRun): R;
  link(node: LinkNode): R;
  image(node: ImageNode): R;
}

interface DocNode {
  // Double dispatch: the node picks the visitor method, the visitor picks the behaviour.
  accept<R>(visitor: DocVisitor<R>): R;
}

class TextRun implements DocNode {
  constructor(public readonly text: string, public readonly bold: boolean = false) {}
  public accept<R>(visitor: DocVisitor<R>): R {
    return visitor.text(this);
  }
}

class LinkNode implements DocNode {
  constructor(public readonly label: string, public readonly href: string) {}
  public accept<R>(visitor: DocVisitor<R>): R {
    return visitor.link(this);
  }
}

class ImageNode implements DocNode {
  constructor(public readonly src: string, public readonly alt: string) {}
  public accept<R>(visitor: DocVisitor<R>): R {
    return visitor.image(this);
  }
}

class Paragraph implements DocNode {
  constructor(public readonly children: DocNode[]) {}
  public accept<R>(visitor: DocVisitor<R>): R {
    return visitor.paragraph(this);
  }
}

class HtmlVisitor implements DocVisitor<string> {
  public paragraph(node: Paragraph): string {
    return `<p>${node.children.map((c: DocNode): string => c.accept(this)).join("")}</p>`;
  }
  public text(node: TextRun): string {
    return node.bold ? `<strong>${node.text}</strong>` : node.text;
  }
  public link(node: LinkNode): string {
    return `<a href="${node.href}">${node.label}</a>`;
  }
  public image(node: ImageNode): string {
    return `<img src="${node.src}" alt="${node.alt}">`;
  }
}

class MarkdownVisitor implements DocVisitor<string> {
  public paragraph(node: Paragraph): string {
    return `${node.children.map((c: DocNode): string => c.accept(this)).join("")}\n`;
  }
  public text(node: TextRun): string {
    return node.bold ? `**${node.text}**` : node.text;
  }
  public link(node: LinkNode): string {
    return `[${node.label}](${node.href})`;
  }
  public image(node: ImageNode): string {
    return `![${node.alt}](${node.src})`;
  }
}

// Plain text for the search index and the email preview line.
class PlainTextVisitor implements DocVisitor<string> {
  public paragraph(node: Paragraph): string {
    return node.children.map((c: DocNode): string => c.accept(this)).join("");
  }
  public text(node: TextRun): string {
    return node.text;
  }
  public link(node: LinkNode): string {
    return node.label;
  }
  public image(node: ImageNode): string {
    return ""; // images contribute nothing to a text preview
  }
}

// A visitor does not have to return a string.
class WordCountVisitor implements DocVisitor<number> {
  public paragraph(node: Paragraph): number {
    return node.children.reduce((sum: number, c: DocNode): number => sum + c.accept(this), 0);
  }
  public text(node: TextRun): number {
    return node.text.trim().split(/\s+/).filter((w: string): boolean => w !== "").length;
  }
  public link(node: LinkNode): number {
    return node.label.trim().split(/\s+/).length;
  }
  public image(): number {
    return 0;
  }
}

// ---- Demo ----

const doc: Paragraph = new Paragraph([
  new TextRun("Read our "),
  new TextRun("new pricing", true),
  new TextRun(" page or "),
  new LinkNode("contact sales", "/contact"),
  new TextRun("."),
  new ImageNode("/chart.png", "revenue chart"),
]);

console.log("HTML:     ", doc.accept(new HtmlVisitor()));
console.log("Markdown: ", doc.accept(new MarkdownVisitor()).trim());
console.log("Plain:    ", doc.accept(new PlainTextVisitor()));
console.log("Words:    ", doc.accept(new WordCountVisitor()));
