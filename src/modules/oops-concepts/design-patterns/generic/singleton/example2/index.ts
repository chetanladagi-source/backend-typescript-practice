// Singleton (generic) — Example 2: one cash drawer for the whole coffee shop.
// Every counter must see the same till. Two drawers means the books never balance.

export class CashDrawer {
  private static instance?: CashDrawer;
  private balance: number = 0;

  private constructor() {}

  public static getInstance(): CashDrawer {
    if (CashDrawer.instance === undefined) {
      CashDrawer.instance = new CashDrawer();
      console.log("  [CashDrawer] opened for the day");
    }
    return CashDrawer.instance;
  }

  // Tests (and end-of-day) need a way to start over. Without this, Singleton is untestable.
  public static resetForTests(): void {
    CashDrawer.instance = undefined;
  }

  public sale(amount: number): void {
    this.balance += amount;
    console.log(`  sale +Rs.${amount}  till=Rs.${this.balance}`);
  }

  public refund(amount: number): void {
    this.balance -= amount;
    console.log(`  refund -Rs.${amount}  till=Rs.${this.balance}`);
  }

  public total(): number {
    return this.balance;
  }
}

// ---- Demo ----

const counterA: CashDrawer = CashDrawer.getInstance();
const counterB: CashDrawer = CashDrawer.getInstance();
const managerReport: CashDrawer = CashDrawer.getInstance();

console.log("same till?", counterA === counterB && counterB === managerReport);

counterA.sale(180); // latte
counterB.sale(100); // espresso
counterA.refund(100); // espresso cancelled

console.log("manager sees Rs." + managerReport.total());

console.log("\nend of day — reset, then a new day opens a fresh drawer:");
CashDrawer.resetForTests();
const nextDay: CashDrawer = CashDrawer.getInstance();
console.log("new instance?", nextDay !== counterA, "balance:", nextDay.total());
