// Visitor — Example 1: an expression AST.
// The node types are fixed; the operations over them keep growing.

export interface ExprVisitor<T> {
  visitNumber(node: NumberNode): T;
  visitAdd(node: AddNode): T;
  visitMultiply(node: MultiplyNode): T;
  visitNegate(node: NegateNode): T;
}

export interface Expr {
  accept<T>(visitor: ExprVisitor<T>): T;
}

class NumberNode implements Expr {
  constructor(public readonly value: number) {}
  // Double dispatch: the node knows which visit method to call.
  public accept<T>(visitor: ExprVisitor<T>): T {
    return visitor.visitNumber(this);
  }
}

class AddNode implements Expr {
  constructor(public readonly left: Expr, public readonly right: Expr) {}
  public accept<T>(visitor: ExprVisitor<T>): T {
    return visitor.visitAdd(this);
  }
}

class MultiplyNode implements Expr {
  constructor(public readonly left: Expr, public readonly right: Expr) {}
  public accept<T>(visitor: ExprVisitor<T>): T {
    return visitor.visitMultiply(this);
  }
}

class NegateNode implements Expr {
  constructor(public readonly operand: Expr) {}
  public accept<T>(visitor: ExprVisitor<T>): T {
    return visitor.visitNegate(this);
  }
}

// --- Operation 1: evaluate ---
class Evaluator implements ExprVisitor<number> {
  public visitNumber(node: NumberNode): number {
    return node.value;
  }
  public visitAdd(node: AddNode): number {
    return node.left.accept(this) + node.right.accept(this);
  }
  public visitMultiply(node: MultiplyNode): number {
    return node.left.accept(this) * node.right.accept(this);
  }
  public visitNegate(node: NegateNode): number {
    return -node.operand.accept(this);
  }
}

// --- Operation 2: pretty-print. A new class; no AST node was touched. ---
class Printer implements ExprVisitor<string> {
  public visitNumber(node: NumberNode): string {
    return String(node.value);
  }
  public visitAdd(node: AddNode): string {
    return `(${node.left.accept(this)} + ${node.right.accept(this)})`;
  }
  public visitMultiply(node: MultiplyNode): string {
    return `(${node.left.accept(this)} * ${node.right.accept(this)})`;
  }
  public visitNegate(node: NegateNode): string {
    return `-${node.operand.accept(this)}`;
  }
}

// --- Operation 3: count the operations, for a complexity metric ---
class NodeCounter implements ExprVisitor<number> {
  public visitNumber(): number {
    return 0;
  }
  public visitAdd(node: AddNode): number {
    return 1 + node.left.accept(this) + node.right.accept(this);
  }
  public visitMultiply(node: MultiplyNode): number {
    return 1 + node.left.accept(this) + node.right.accept(this);
  }
  public visitNegate(node: NegateNode): number {
    return 1 + node.operand.accept(this);
  }
}

// ---- Demo ----

// -(2 + 3) * 4
const ast: Expr = new MultiplyNode(
  new NegateNode(new AddNode(new NumberNode(2), new NumberNode(3))),
  new NumberNode(4),
);

console.log("printed :", ast.accept(new Printer()));
console.log("value   :", ast.accept(new Evaluator()));
console.log("op count:", ast.accept(new NodeCounter()));
