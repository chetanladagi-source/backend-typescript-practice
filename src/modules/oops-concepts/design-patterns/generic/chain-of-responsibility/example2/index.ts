// Chain of Responsibility (generic) — Example 2: employee leave-approval pipeline.

interface LeaveRequest {
  employee: string;
  days: number;
  reason: string;
}

type Decision = { kind: "approved"; by: string } | { kind: "rejected"; by: string; reason: string } | { kind: "pass" };

export abstract class Approver {
  private next?: Approver;

  public setNext(next: Approver): Approver {
    this.next = next;
    return next;
  }

  public handle(request: LeaveRequest): void {
    const decision: Decision = this.decide(request);
    if (decision.kind === "approved") {
      console.log(`  APPROVED by ${decision.by} (${request.days}d for ${request.employee})`);
      return;
    }
    if (decision.kind === "rejected") {
      console.log(`  REJECTED by ${decision.by}: ${decision.reason}`);
      return;
    }
    if (this.next === undefined) {
      console.log(`  no one left to approve ${request.days}d for ${request.employee}`);
      return;
    }
    console.log(`  ${this.name} passes ${request.days}d up`);
    this.next.handle(request);
  }

  protected abstract readonly name: string;
  protected abstract decide(request: LeaveRequest): Decision;
}

class Manager extends Approver {
  protected readonly name: string = "Manager";
  protected decide(request: LeaveRequest): Decision {
    if (request.days <= 2) {
      return { kind: "approved", by: this.name };
    }
    return { kind: "pass" };
  }
}

class Director extends Approver {
  protected readonly name: string = "Director";
  protected decide(request: LeaveRequest): Decision {
    if (request.days <= 10) {
      return { kind: "approved", by: this.name };
    }
    return { kind: "pass" };
  }
}

class Hr extends Approver {
  protected readonly name: string = "HR";
  protected decide(request: LeaveRequest): Decision {
    if (request.reason === "unpaid-sabbatical") {
      return { kind: "rejected", by: this.name, reason: "sabbaticals are frozen this quarter" };
    }
    return { kind: "approved", by: this.name };
  }
}

// ---- Demo ----

const chain: Approver = new Manager();
chain.setNext(new Director()).setNext(new Hr());

function apply(employee: string, days: number, reason: string): void {
  console.log(`\n${employee} asks for ${days}d (${reason})`);
  chain.handle({ employee, days, reason });
}

apply("Ada", 1, "fever");
apply("Grace", 7, "wedding");
apply("Linus", 20, "unpaid-sabbatical");
apply("Radia", 15, "medical");
