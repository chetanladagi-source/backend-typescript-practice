// State (generic) — Example 1: a payment lifecycle, one class per state.

// CONTEXT. Holds the current state; forwards all operations to it.
export class Payment {
  private state: PaymentState;

  constructor(public readonly amount: number) {
    this.state = new InitiatedState(this);
  }

  public setState(next: PaymentState): void {
    console.log(`  ${this.state.name} -> ${next.name}`);
    this.state = next;
  }

  public get stateName(): string {
    return this.state.name;
  }

  // The context has no `if` on state — it forwards blindly.
  public authorize(): void {
    this.state.authorize();
  }
  public capture(): void {
    this.state.capture();
  }
  public refund(): void {
    this.state.refund();
  }
  public fail(reason: string): void {
    this.state.fail(reason);
  }
}

// STATE INTERFACE. Every operation is defined; each state supplies its own behaviour.
export interface PaymentState {
  readonly name: string;
  authorize(): void;
  capture(): void;
  refund(): void;
  fail(reason: string): void;
}

// Base default: everything is illegal. Concrete states override the ones they allow.
// This is what makes forgetting a transition IMPOSSIBLE — the base rejects it by default.
abstract class BasePaymentState implements PaymentState {
  public abstract readonly name: string;
  protected constructor(protected readonly payment: Payment) {}

  public authorize(): void {
    this.reject("authorize");
  }
  public capture(): void {
    this.reject("capture");
  }
  public refund(): void {
    this.reject("refund");
  }
  public fail(_reason: string): void {
    this.reject("fail");
  }

  private reject(action: string): void {
    console.log(`  ${action} is not allowed in state "${this.name}"`);
  }
}

class InitiatedState extends BasePaymentState {
  public readonly name: string = "initiated";
  constructor(payment: Payment) {
    super(payment);
  }
  public override authorize(): void {
    this.payment.setState(new AuthorizedState(this.payment));
    console.log(`    reserved Rs.${this.payment.amount} on the card`);
  }
  public override fail(reason: string): void {
    this.payment.setState(new FailedState(this.payment, reason));
    console.log(`    payment failed: ${reason}`);
  }
}

class AuthorizedState extends BasePaymentState {
  public readonly name: string = "authorized";
  constructor(payment: Payment) {
    super(payment);
  }
  public override capture(): void {
    this.payment.setState(new CapturedState(this.payment));
    console.log(`    captured Rs.${this.payment.amount}`);
  }
  public override fail(reason: string): void {
    this.payment.setState(new FailedState(this.payment, reason));
    console.log(`    authorization expired: ${reason}`);
  }
}

class CapturedState extends BasePaymentState {
  public readonly name: string = "captured";
  constructor(payment: Payment) {
    super(payment);
  }
  public override refund(): void {
    this.payment.setState(new RefundedState(this.payment));
    console.log(`    refunded Rs.${this.payment.amount}`);
  }
}

class RefundedState extends BasePaymentState {
  public readonly name: string = "refunded";
  constructor(payment: Payment) {
    super(payment);
  }
  // No overrides: refunded is terminal. All actions fall through to reject().
}

class FailedState extends BasePaymentState {
  public readonly name: string = "failed";
  constructor(payment: Payment, public readonly reason: string) {
    super(payment);
  }
  // Terminal.
}

// ---- Demo ----

console.log("--- happy path ---");
const p1: Payment = new Payment(500);
p1.authorize();
p1.capture();
p1.refund();

console.log("\n--- capture BEFORE authorize is rejected ---");
const p2: Payment = new Payment(1000);
p2.capture(); // rejected — still "initiated"
p2.refund(); // rejected — still "initiated"
p2.authorize();
p2.capture();
p2.refund();
p2.refund(); // rejected — already refunded

console.log("\n--- failure is terminal ---");
const p3: Payment = new Payment(2000);
p3.authorize();
p3.fail("bank timeout");
p3.capture(); // rejected — state is "failed"
