// State — Example 2: a circuit breaker.
// The canonical backend state machine: closed -> open -> half-open -> closed.

export interface BreakerState {
  readonly name: string;
  call<T>(breaker: CircuitBreaker, operation: () => T): T;
}

// Normal operation: let calls through, count failures.
class ClosedState implements BreakerState {
  public readonly name: string = "closed";
  private failures: number = 0;

  public call<T>(breaker: CircuitBreaker, operation: () => T): T {
    try {
      const result: T = operation();
      this.failures = 0; // a success resets the streak
      return result;
    } catch (err) {
      this.failures++;
      console.log(`  failure ${this.failures}/${breaker.threshold}`);
      if (this.failures >= breaker.threshold) {
        breaker.transitionTo(new OpenState());
      }
      throw err;
    }
  }
}

// Tripped: fail fast without touching the downstream service.
class OpenState implements BreakerState {
  public readonly name: string = "open";
  private readonly openedAt: number = Date.now();

  public call<T>(breaker: CircuitBreaker, operation: () => T): T {
    if (breaker.now() - this.openedAt >= breaker.cooldownMs) {
      breaker.transitionTo(new HalfOpenState());
      return breaker.call(operation);
    }
    throw new Error("circuit is open, failing fast");
  }
}

// Probing: allow one call through to see if the service recovered.
class HalfOpenState implements BreakerState {
  public readonly name: string = "half-open";

  public call<T>(breaker: CircuitBreaker, operation: () => T): T {
    try {
      const result: T = operation();
      breaker.transitionTo(new ClosedState());
      return result;
    } catch (err) {
      breaker.transitionTo(new OpenState());
      throw err;
    }
  }
}

export class CircuitBreaker {
  private state: BreakerState = new ClosedState();
  private clockOffset: number = 0;

  constructor(
    public readonly threshold: number = 3,
    public readonly cooldownMs: number = 5000,
  ) {}

  public transitionTo(state: BreakerState): void {
    console.log(`  [breaker] ${this.state.name} -> ${state.name}`);
    this.state = state;
  }

  public call<T>(operation: () => T): T {
    return this.state.call(this, operation);
  }

  public status(): string {
    return this.state.name;
  }

  public now(): number {
    return Date.now() + this.clockOffset;
  }

  public advanceClockBy(ms: number): void {
    this.clockOffset += ms;
  }
}

// ---- Demo ----

const breaker: CircuitBreaker = new CircuitBreaker(3, 5000);

let serviceIsDown: boolean = true;
const downstream = (): string => {
  if (serviceIsDown) {
    throw new Error("ETIMEDOUT");
  }
  return "200 OK";
};

const attempt = (label: string): void => {
  try {
    console.log(`${label}: ${breaker.call(downstream)}`);
  } catch (err) {
    console.log(`${label}: ${(err as Error).message}`);
  }
};

attempt("call 1");
attempt("call 2");
attempt("call 3"); // threshold reached, trips open
attempt("call 4"); // fails fast, never reaches downstream

console.log("--- 6 seconds pass, service recovers ---");
breaker.advanceClockBy(6000);
serviceIsDown = false;

attempt("call 5"); // half-open probe succeeds, closes
attempt("call 6");
console.log("final state:", breaker.status());
