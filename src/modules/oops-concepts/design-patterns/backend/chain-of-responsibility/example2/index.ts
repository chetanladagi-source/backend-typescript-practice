// Chain of Responsibility — Example 2: expense approval by amount.
// The "pure" flavour: exactly one approver handles it, then the chain stops.

export interface Expense {
  id: string;
  description: string;
  amount: number;
}

abstract class Approver {
  private next?: Approver;

  constructor(protected readonly name: string, protected readonly limit: number) {}

  public setNext(next: Approver): Approver {
    this.next = next;
    return next;
  }

  public review(expense: Expense): void {
    if (expense.amount <= this.limit) {
      this.approve(expense);
      return; // handled, chain stops here
    }
    if (this.next === undefined) {
      console.log(`  ${expense.id} (Rs.${expense.amount}) exceeds every approval limit — escalate manually`);
      return;
    }
    console.log(`  ${this.name} cannot approve Rs.${expense.amount}, escalating`);
    this.next.review(expense);
  }

  protected abstract approve(expense: Expense): void;
}

class TeamLead extends Approver {
  constructor() {
    super("Team lead", 10_000);
  }
  protected approve(expense: Expense): void {
    console.log(`  approved by ${this.name}: ${expense.description} (Rs.${expense.amount})`);
  }
}

class Manager extends Approver {
  constructor() {
    super("Manager", 100_000);
  }
  protected approve(expense: Expense): void {
    console.log(`  approved by ${this.name}: ${expense.description} (Rs.${expense.amount})`);
  }
}

class Director extends Approver {
  constructor() {
    super("Director", 1_000_000);
  }
  protected approve(expense: Expense): void {
    console.log(`  approved by ${this.name} with board notification: ${expense.description}`);
  }
}

// ---- Demo ----

const lead: Approver = new TeamLead();
lead.setNext(new Manager()).setNext(new Director());

const expenses: Expense[] = [
  { id: "E-1", description: "Team lunch", amount: 4_500 },
  { id: "E-2", description: "Conference tickets", amount: 65_000 },
  { id: "E-3", description: "Server capacity", amount: 480_000 },
  { id: "E-4", description: "Office lease", amount: 8_000_000 },
];

expenses.forEach((expense: Expense): void => {
  console.log(`${expense.id}:`);
  lead.review(expense);
});
