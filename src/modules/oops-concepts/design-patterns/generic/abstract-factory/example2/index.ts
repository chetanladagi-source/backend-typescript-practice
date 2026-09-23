// Abstract Factory (generic) — Example 2: country-specific employee onboarding kits.
// ID check, payroll and benefits must come from the SAME country.

interface IdentityCheck {
  verify(name: string): string;
}

interface Payroll {
  firstPay(name: string, salary: number): string;
}

interface Benefits {
  enrol(name: string): string;
}

// --- India family ---

class AadhaarCheck implements IdentityCheck {
  public verify(name: string): string {
    return `Aadhaar OTP verified for ${name}`;
  }
}

class InrPayroll implements Payroll {
  public firstPay(name: string, salary: number): string {
    const tds: number = Math.round(salary * 0.1);
    return `INR payroll: credited Rs.${salary - tds} to ${name} (TDS Rs.${tds})`;
  }
}

class EsiPfBenefits implements Benefits {
  public enrol(name: string): string {
    return `${name} enrolled in ESI + EPF`;
  }
}

// --- US family ---

class SsnCheck implements IdentityCheck {
  public verify(name: string): string {
    return `SSN + I-9 completed for ${name}`;
  }
}

class UsdPayroll implements Payroll {
  public firstPay(name: string, salary: number): string {
    const withholding: number = Math.round(salary * 0.22);
    return `USD payroll: deposited $${salary - withholding} to ${name} (W-4 withholding $${withholding})`;
  }
}

class Health401kBenefits implements Benefits {
  public enrol(name: string): string {
    return `${name} enrolled in employer health + 401(k)`;
  }
}

// The abstract factory: one method per product in the family.
export interface CountryKit {
  readonly country: string;
  createIdentityCheck(): IdentityCheck;
  createPayroll(): Payroll;
  createBenefits(): Benefits;
}

class IndiaKit implements CountryKit {
  public readonly country: string = "IN";
  public createIdentityCheck(): IdentityCheck {
    return new AadhaarCheck();
  }
  public createPayroll(): Payroll {
    return new InrPayroll();
  }
  public createBenefits(): Benefits {
    return new EsiPfBenefits();
  }
}

class UsKit implements CountryKit {
  public readonly country: string = "US";
  public createIdentityCheck(): IdentityCheck {
    return new SsnCheck();
  }
  public createPayroll(): Payroll {
    return new UsdPayroll();
  }
  public createBenefits(): Benefits {
    return new Health401kBenefits();
  }
}

// HR code is written once. It never names Aadhaar, SSN, ESI or 401(k).
function onboard(kit: CountryKit, name: string, salary: number): void {
  console.log(`\nonboarding ${name} in ${kit.country}`);
  console.log("  " + kit.createIdentityCheck().verify(name));
  console.log("  " + kit.createPayroll().firstPay(name, salary));
  console.log("  " + kit.createBenefits().enrol(name));
}

// ---- Demo ----

onboard(new IndiaKit(), "Ada", 100000);
onboard(new UsKit(), "Grace", 8000);

// The guarantee: you cannot onboard Ada with Aadhaar + W-4 + 401(k).
// Those classes are not reachable except through a kit, and no kit mixes them.
// Contrast with three independent factories, where nothing stops:
//   verify = new AadhaarCheck();
//   pay    = new UsdPayroll();   // compiles, wrong in production
