// Template Method (generic) — Example 1: employee onboarding.
// The sequence is fixed. Subclasses fill in the steps that differ.

export abstract class Onboarding {
  // THE TEMPLATE METHOD. Subclasses must not override this.
  public run(name: string): void {
    console.log(`\nonboarding ${name} as ${this.role()}`);
    this.collectDocuments(name);
    this.verifyIdentity(name);
    this.provisionAccess(name);
    // Optional hook: default is a no-op, Engineer overrides it.
    const mentor: string | undefined = this.assignMentor();
    if (mentor !== undefined) {
      console.log(`  assigned mentor: ${mentor}`);
    }
    this.sendWelcome(name);
  }

  protected abstract role(): string;
  protected abstract provisionAccess(name: string): void;

  // Shared steps — written once, used by every role.
  protected collectDocuments(name: string): void {
    console.log(`  collected ID and tax form for ${name}`);
  }

  protected verifyIdentity(name: string): void {
    console.log(`  verified ${name} against HR records`);
  }

  protected sendWelcome(name: string): void {
    console.log(`  emailed welcome pack to ${name.toLowerCase()}@acme.com`);
  }

  // Hook with a default. Override only if you care.
  protected assignMentor(): string | undefined {
    return undefined;
  }
}

class EngineerOnboarding extends Onboarding {
  protected role(): string {
    return "Engineer";
  }
  protected provisionAccess(name: string): void {
    console.log(`  provisioned GitHub + laptop for ${name}`);
  }
  protected override assignMentor(): string {
    return "Ada Lovelace";
  }
}

class InternOnboarding extends Onboarding {
  protected role(): string {
    return "Intern";
  }
  protected provisionAccess(name: string): void {
    console.log(`  provisioned read-only Slack + shared desk for ${name}`);
  }
  // No mentor hook — the default no-op stands.
}

class ManagerOnboarding extends Onboarding {
  protected role(): string {
    return "Manager";
  }
  protected provisionAccess(name: string): void {
    console.log(`  provisioned payroll admin + 1:1 calendar for ${name}`);
  }
  protected override assignMentor(): string {
    return "Grace Hopper";
  }
}

// ---- Demo ----

new EngineerOnboarding().run("Linus");
new InternOnboarding().run("Yves");
new ManagerOnboarding().run("Radia");

// Adding "Analyst" is one subclass. The sequence (collect → verify → provision →
// maybe mentor → welcome) is never rewritten, so no role can skip verification by accident.
