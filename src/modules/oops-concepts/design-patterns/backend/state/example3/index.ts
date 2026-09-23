// State — Example 3: a document review workflow.
// Adds role checks, because in real workflows "who is acting" matters too.

export interface Actor {
  name: string;
  role: "author" | "reviewer" | "admin";
}

export interface DocState {
  readonly name: string;
  submit(doc: Document, actor: Actor): void;
  approve(doc: Document, actor: Actor): void;
  reject(doc: Document, actor: Actor, reason: string): void;
}

abstract class BaseDocState implements DocState {
  public abstract readonly name: string;

  public submit(_doc: Document, _actor: Actor): void {
    this.deny("submit");
  }
  public approve(_doc: Document, _actor: Actor): void {
    this.deny("approve");
  }
  public reject(_doc: Document, _actor: Actor, _reason: string): void {
    this.deny("reject");
  }

  protected deny(action: string): void {
    console.log(`  "${action}" is not valid while ${this.name}`);
  }
}

class Draft extends BaseDocState {
  public readonly name: string = "draft";

  public submit(doc: Document, actor: Actor): void {
    if (actor.role !== "author") {
      console.log(`  only the author can submit (${actor.name} is ${actor.role})`);
      return;
    }
    doc.transitionTo(new InReview());
  }
}

class InReview extends BaseDocState {
  public readonly name: string = "in-review";

  public approve(doc: Document, actor: Actor): void {
    if (actor.role === "author") {
      console.log("  authors cannot approve their own document");
      return;
    }
    doc.transitionTo(new Published());
  }

  public reject(doc: Document, actor: Actor, reason: string): void {
    console.log(`  ${actor.name} rejected: ${reason}`);
    doc.transitionTo(new Draft());
  }
}

class Published extends BaseDocState {
  public readonly name: string = "published";
  // Terminal: a published document must be cloned into a new draft to change.
}

export class Document {
  private state: DocState = new Draft();
  public readonly history: string[] = ["draft"];

  constructor(public readonly title: string) {}

  public transitionTo(state: DocState): void {
    console.log(`  [${this.title}] ${this.state.name} -> ${state.name}`);
    this.state = state;
    this.history.push(state.name);
  }

  public status(): string {
    return this.state.name;
  }

  public submit(actor: Actor): void {
    this.state.submit(this, actor);
  }
  public approve(actor: Actor): void {
    this.state.approve(this, actor);
  }
  public reject(actor: Actor, reason: string): void {
    this.state.reject(this, actor, reason);
  }
}

// ---- Demo ----

const author: Actor = { name: "Ada", role: "author" };
const reviewer: Actor = { name: "Grace", role: "reviewer" };

const doc: Document = new Document("Q3 Architecture RFC");

doc.approve(reviewer); // not in review yet
doc.submit(reviewer); // wrong role
doc.submit(author); // ok

doc.approve(author); // author cannot self-approve
doc.reject(reviewer, "needs a rollback plan"); // back to draft

doc.submit(author);
doc.approve(reviewer); // published
doc.submit(author); // terminal state

console.log("status:", doc.status());
console.log("history:", doc.history.join(" -> "));
