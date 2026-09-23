// Chain of Responsibility (generic) — Example 1: payment authorization pipeline.

interface PaymentRequest {
  userId: string;
  amount: number;
  currency: string;
  cardCountry: string;
  kycVerified: boolean;
  availableBalance: number;
}

type Result = { kind: "pass" } | { kind: "reject"; reason: string };

// Every handler implements this. The link to the next handler is on the handler itself
// (each handler decides whether to hand the request over).
export abstract class PaymentCheck {
  private next?: PaymentCheck;

  public setNext(next: PaymentCheck): PaymentCheck {
    this.next = next;
    return next; // returning `next` makes chaining read left-to-right
  }

  public handle(request: PaymentRequest): Result {
    const own: Result = this.check(request);
    if (own.kind === "reject") {
      return own; // stop the chain
    }
    return this.next?.handle(request) ?? { kind: "pass" };
  }

  protected abstract check(request: PaymentRequest): Result;
}

class FraudCheck extends PaymentCheck {
  protected check(request: PaymentRequest): Result {
    // Cross-country charge over a threshold looks suspicious.
    if (request.cardCountry !== "IN" && request.amount > 10000) {
      return { kind: "reject", reason: `foreign card (${request.cardCountry}) over threshold` };
    }
    console.log("  [fraud] pass");
    return { kind: "pass" };
  }
}

class KycCheck extends PaymentCheck {
  protected check(request: PaymentRequest): Result {
    if (!request.kycVerified && request.amount > 50000) {
      return { kind: "reject", reason: "KYC required for high-value payments" };
    }
    console.log("  [kyc] pass");
    return { kind: "pass" };
  }
}

class FundsCheck extends PaymentCheck {
  protected check(request: PaymentRequest): Result {
    if (request.amount > request.availableBalance) {
      return { kind: "reject", reason: "insufficient funds" };
    }
    console.log("  [funds] pass");
    return { kind: "pass" };
  }
}

class ThreeDSecureCheck extends PaymentCheck {
  protected check(request: PaymentRequest): Result {
    // A real 3-D Secure step would redirect. We just require it for large amounts.
    if (request.amount > 25000) {
      console.log("  [3ds] challenge issued (simulated pass)");
      return { kind: "pass" };
    }
    console.log("  [3ds] not required");
    return { kind: "pass" };
  }
}

// ---- Demo ----

// Order is the design. Cheap checks first, expensive ones last.
const pipeline: PaymentCheck = new FraudCheck();
pipeline.setNext(new KycCheck()).setNext(new FundsCheck()).setNext(new ThreeDSecureCheck());

function authorize(label: string, request: PaymentRequest): void {
  console.log(`\n${label}: Rs.${request.amount} from ${request.userId}`);
  const result: Result = pipeline.handle(request);
  console.log(result.kind === "pass" ? "  RESULT: authorized" : `  RESULT: rejected — ${result.reason}`);
}

authorize("Small local charge", {
  userId: "u-1",
  amount: 500,
  currency: "INR",
  cardCountry: "IN",
  kycVerified: true,
  availableBalance: 20000,
});

authorize("Suspicious foreign", {
  userId: "u-2",
  amount: 30000,
  currency: "INR",
  cardCountry: "RU",
  kycVerified: true,
  availableBalance: 100000,
});

authorize("High-value, no KYC", {
  userId: "u-3",
  amount: 75000,
  currency: "INR",
  cardCountry: "IN",
  kycVerified: false,
  availableBalance: 200000,
});

authorize("High-value with KYC", {
  userId: "u-4",
  amount: 75000,
  currency: "INR",
  cardCountry: "IN",
  kycVerified: true,
  availableBalance: 200000,
});
