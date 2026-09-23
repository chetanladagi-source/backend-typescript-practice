// State (frontend) — Example 1: request status as a discriminated union.
// The compiler, not a comment, guarantees you cannot read `data` while loading.

export type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T; fetchedAt: number }
  | { status: "error"; error: string; attempt: number };

interface User {
  name: string;
}

// What a component would render. Note there is no `if (data)` defensive check anywhere:
// each branch narrows to a shape where the fields it uses definitely exist.
function render(state: RequestState<User>): string {
  switch (state.status) {
    case "idle":
      return "<button>Load profile</button>";
    case "loading":
      return "<Spinner />";
    case "success":
      return `<Profile name="${state.data.name}" /> (t=${state.fetchedAt})`;
    case "error":
      return `<Error>${state.error}</Error> <button>Retry (attempt ${state.attempt})</button>`;
  }
}

class RequestMachine {
  private state: RequestState<User> = { status: "idle" };
  // Every start() gets a ticket; only the newest ticket may write a result.
  private ticket: number = 0;
  // Consecutive failures. Cannot live on the state itself: `loading` sits between
  // two errors and would wipe it, so a retry would always report "attempt 1".
  private failures: number = 0;

  public snapshot(): RequestState<User> {
    return this.state;
  }

  private transition(next: RequestState<User>): void {
    console.log(`  ${this.state.status} -> ${next.status}`);
    this.state = next;
    console.log(`    renders: ${render(next)}`);
  }

  public start(): number {
    if (this.state.status === "loading") {
      console.log("  already loading — ignored (this is how double-submits are stopped)");
      return this.ticket;
    }
    this.ticket += 1;
    this.transition({ status: "loading" });
    return this.ticket;
  }

  public succeed(ticket: number, data: User, fetchedAt: number): void {
    if (ticket !== this.ticket) {
      console.log(`  stale response for ticket ${ticket} discarded (current is ${this.ticket})`);
      return;
    }
    this.failures = 0;
    this.transition({ status: "success", data, fetchedAt });
  }

  public fail(ticket: number, error: string): void {
    if (ticket !== this.ticket) {
      console.log(`  stale error for ticket ${ticket} discarded`);
      return;
    }
    this.failures += 1;
    this.transition({ status: "error", error, attempt: this.failures });
  }
}

// ---- Demo ----

const machine: RequestMachine = new RequestMachine();
console.log("initial:", render(machine.snapshot()));

console.log("\nuser clicks Load:");
const first: number = machine.start();
machine.start(); // guarded: no second request

console.log("\nthe request fails:");
machine.fail(first, "network timeout");

console.log("\nuser clicks Retry:");
const second: number = machine.start();
machine.fail(second, "network timeout");

console.log("\nuser clicks Retry again:");
const third: number = machine.start();
machine.succeed(third, { name: "Ada" }, 1712);

console.log("\nthe abandoned first request finally answers:");
machine.succeed(first, { name: "Stale Ada" }, 1000);
console.log("  still showing:", render(machine.snapshot()));
