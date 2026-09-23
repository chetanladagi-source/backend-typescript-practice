// Proxy (generic) — Example 1: a protection proxy in front of the payment service.
// The proxy has the SAME shape as the real object, so it is a drop-in replacement.

interface User {
  id: string;
  role: "admin" | "user" | "guest";
  dailyLimit: number;
}

// THE INTERFACE. The proxy and the real object both implement this.
export interface Payment {
  charge(user: User, amount: number, description: string): void;
}

// THE REAL SUBJECT. Knows nothing about auth, rate limits or logging.
class RealPayment implements Payment {
  public charge(user: User, amount: number, description: string): void {
    console.log(`    [RealPayment] +Rs.${amount} for ${user.id}: ${description}`);
  }
}

// THE PROXY. Same interface, wraps the real subject, guards it.
export class AuthorizedPayment implements Payment {
  private readonly spentToday: Map<string, number> = new Map<string, number>();

  constructor(private readonly real: Payment) {}

  public charge(user: User, amount: number, description: string): void {
    // Guard 1: authentication.
    if (user.role === "guest") {
      console.log(`  denied: ${user.id} is not signed in`);
      return;
    }
    // Guard 2: per-user daily limit.
    const already: number = this.spentToday.get(user.id) ?? 0;
    if (already + amount > user.dailyLimit) {
      console.log(`  denied: ${user.id} would exceed daily limit (Rs.${user.dailyLimit})`);
      return;
    }
    // Guard 3: audit logging (a common proxy responsibility on top of protection).
    console.log(`  audit: ${user.id} (${user.role}) charging Rs.${amount} for "${description}"`);

    // Delegate to the real object. This is the only place that has to change if the
    // real service changes.
    this.real.charge(user, amount, description);
    this.spentToday.set(user.id, already + amount);
  }
}

// ---- Demo ----

// Everything in the app that needs to charge someone accepts `Payment`, not `RealPayment`.
// That is what makes the proxy a drop-in replacement.
const payments: Payment = new AuthorizedPayment(new RealPayment());

const admin: User = { id: "u-1", role: "admin", dailyLimit: 1_000_000 };
const user: User = { id: "u-2", role: "user", dailyLimit: 5000 };
const guest: User = { id: "u-3", role: "guest", dailyLimit: 0 };

payments.charge(admin, 200, "office supplies");
payments.charge(user, 1500, "monthly plan");
payments.charge(user, 4000, "upgrade");        // takes them over the limit
payments.charge(guest, 100, "trial");           // no auth
