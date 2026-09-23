// Chain of Responsibility (frontend) — Example 2: a route guard pipeline.
// Each guard either redirects (claiming the navigation) or passes it along.

interface Session {
  user?: { name: string; roles: string[]; onboarded: boolean; plan: string };
}

interface Route {
  path: string;
  requiresAuth: boolean;
  requiredRole?: string;
  requiresPaidPlan?: boolean;
}

type GuardResult = { kind: "allow" } | { kind: "redirect"; to: string; reason: string };

export interface Guard {
  readonly name: string;
  check(route: Route, session: Session): GuardResult;
}

const authGuard: Guard = {
  name: "auth",
  check: (route: Route, session: Session): GuardResult =>
    route.requiresAuth && session.user === undefined
      ? { kind: "redirect", to: `/login?next=${route.path}`, reason: "not signed in" }
      : { kind: "allow" },
};

// Runs after auth, so it can assume a user exists on protected routes.
const onboardingGuard: Guard = {
  name: "onboarding",
  check: (route: Route, session: Session): GuardResult =>
    session.user !== undefined && !session.user.onboarded && route.path !== "/welcome"
      ? { kind: "redirect", to: "/welcome", reason: "onboarding incomplete" }
      : { kind: "allow" },
};

const roleGuard: Guard = {
  name: "role",
  check: (route: Route, session: Session): GuardResult =>
    route.requiredRole !== undefined && !(session.user?.roles ?? []).includes(route.requiredRole)
      ? { kind: "redirect", to: "/403", reason: `needs role "${route.requiredRole}"` }
      : { kind: "allow" },
};

const billingGuard: Guard = {
  name: "billing",
  check: (route: Route, session: Session): GuardResult =>
    route.requiresPaidPlan === true && session.user?.plan === "free"
      ? { kind: "redirect", to: "/upgrade", reason: "paid plan required" }
      : { kind: "allow" },
};

// Order is the design. auth -> onboarding -> role -> billing.
const pipeline: Guard[] = [authGuard, onboardingGuard, roleGuard, billingGuard];

function navigate(route: Route, session: Session): void {
  console.log(`\nnavigate to ${route.path} as ${session.user?.name ?? "anonymous"}`);
  for (const guard of pipeline) {
    const result: GuardResult = guard.check(route, session);
    if (result.kind === "redirect") {
      console.log(`  ${guard.name} guard -> redirect to ${result.to} (${result.reason})`);
      return; // the chain ends the moment someone claims it
    }
    console.log(`  ${guard.name} guard -> pass`);
  }
  console.log(`  rendering ${route.path}`);
}

// ---- Demo ----

const anonymous: Session = {};
const newUser: Session = { user: { name: "Ada", roles: ["member"], onboarded: false, plan: "free" } };
const member: Session = { user: { name: "Ada", roles: ["member"], onboarded: true, plan: "free" } };
const admin: Session = { user: { name: "Grace", roles: ["member", "admin"], onboarded: true, plan: "pro" } };

const dashboard: Route = { path: "/dashboard", requiresAuth: true };
const reports: Route = { path: "/reports", requiresAuth: true, requiresPaidPlan: true };
const adminPage: Route = { path: "/admin/users", requiresAuth: true, requiredRole: "admin" };
const pricing: Route = { path: "/pricing", requiresAuth: false };

navigate(pricing, anonymous); // public: every guard passes
navigate(dashboard, anonymous); // stopped at the first guard
navigate(dashboard, newUser); // auth passes, onboarding claims it
navigate(adminPage, member); // reaches the role guard
navigate(reports, member); // reaches the last guard
navigate(reports, admin); // all the way through
