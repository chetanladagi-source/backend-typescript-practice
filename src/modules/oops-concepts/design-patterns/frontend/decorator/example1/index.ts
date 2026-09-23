// Decorator (frontend) — Example 1: higher-order components.
// A component takes props and returns markup; an HOC takes a component
// and returns a component with the SAME signature. That is what lets them stack.

export interface Props {
  user?: { name: string; roles: string[] };
  isLoading?: boolean;
  data?: string[];
  shouldCrash?: boolean;
}

export type Component = (props: Props) => string;

// The component being decorated.
const ProjectList: Component = (props: Props): string => {
  if (props.shouldCrash === true) {
    throw new Error("Cannot read properties of undefined (reading 'map')");
  }
  return `<ul>${(props.data ?? []).map((d: string): string => `<li>${d}</li>`).join("")}</ul>`;
};

// --- Decorators: each returns a Component, so they compose ---

const withLoading =
  (Wrapped: Component): Component =>
  (props: Props): string =>
    props.isLoading === true ? `<div class="spinner" aria-busy="true">Loading…</div>` : Wrapped(props);

const withAuth =
  (requiredRole: string) =>
  (Wrapped: Component): Component =>
  (props: Props): string => {
    if (props.user === undefined) {
      return `<a href="/login">Please sign in</a>`;
    }
    if (!props.user.roles.includes(requiredRole)) {
      return `<p role="alert">You need the "${requiredRole}" role to view this.</p>`;
    }
    return Wrapped(props);
  };

const withErrorBoundary =
  (Wrapped: Component): Component =>
  (props: Props): string => {
    try {
      return Wrapped(props);
    } catch (err) {
      return `<div role="alert">Something went wrong: ${(err as Error).message}</div>`;
    }
  };

// ---- Demo ----

// Outermost runs first: error boundary, then auth, then loading, then the component.
const Page: Component = withErrorBoundary(withAuth("member")(withLoading(ProjectList)));

const member = { name: "Ada", roles: ["member"] };
const guest = { name: "Guest", roles: [] as string[] };

console.log("signed out:      ", Page({}));
console.log("wrong role:      ", Page({ user: guest }));
console.log("loading:         ", Page({ user: member, isLoading: true }));
console.log("loaded:          ", Page({ user: member, data: ["Apollo", "Gemini"] }));
console.log("component throws:", Page({ user: member, shouldCrash: true }));

// Order matters. Put auth inside the loading check and unauthorised users
// get a spinner before being told they cannot view the page.
console.log("\n--- wrong order: spinner shown to an unauthorised user ---");
const Badly: Component = withLoading(withAuth("member")(ProjectList));
console.log("guest + loading: ", Badly({ user: guest, isLoading: true }));
