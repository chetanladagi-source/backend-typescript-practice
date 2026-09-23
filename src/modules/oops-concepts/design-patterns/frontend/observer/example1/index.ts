// Observer (frontend) — Example 1: a Zustand-style store with selectors.
// The key idea: a subscriber is only notified when ITS slice changes.

type Listener<T> = (value: T) => void;

interface Subscription<S> {
  select: (state: S) => unknown;
  notify: (value: never) => void;
  last: unknown;
  label: string;
}

export class Store<S extends object> {
  private state: S;
  private readonly subscriptions: Set<Subscription<S>> = new Set();

  constructor(initial: S) {
    this.state = initial;
  }

  public getState(): S {
    return this.state;
  }

  // Subscribe to a SLICE, not the whole store.
  public subscribe<T>(label: string, select: (state: S) => T, notify: Listener<T>): () => void {
    const sub: Subscription<S> = {
      label,
      select,
      notify: notify as (value: never) => void,
      last: select(this.state),
    };
    this.subscriptions.add(sub);
    return (): void => {
      this.subscriptions.delete(sub);
      console.log(`  [store] ${label} unsubscribed`);
    };
  }

  public setState(partial: Partial<S>): void {
    this.state = { ...this.state, ...partial };

    // Only re-run subscribers whose selected slice actually changed.
    [...this.subscriptions].forEach((sub: Subscription<S>): void => {
      const next: unknown = sub.select(this.state);
      if (!Object.is(next, sub.last)) {
        sub.last = next;
        (sub.notify as (v: unknown) => void)(next);
      }
    });
  }

  public subscriberCount(): number {
    return this.subscriptions.size;
  }
}

// ---- Demo ----

interface AppState {
  user: { name: string; plan: string };
  cartCount: number;
  theme: string;
}

const store: Store<AppState> = new Store<AppState>({
  user: { name: "Ada", plan: "free" },
  cartCount: 0,
  theme: "light",
});

// Three "components", each subscribing to a different slice.
const stopHeader = store.subscribe("Header", (s: AppState): string => s.user.name, (name: string): void =>
  console.log(`  <Header> re-render: ${name}`),
);
store.subscribe("CartBadge", (s: AppState): number => s.cartCount, (n: number): void =>
  console.log(`  <CartBadge> re-render: ${n} items`),
);
store.subscribe("UpgradeBanner", (s: AppState): boolean => s.user.plan === "free", (isFree: boolean): void =>
  console.log(`  <UpgradeBanner> re-render: ${isFree ? "shown" : "hidden"}`),
);
// This one selects the whole object instead of a field — watch what that costs.
store.subscribe("ProfileCard", (s: AppState): AppState["user"] => s.user, (u): void =>
  console.log(`  <ProfileCard> re-render: ${u.name} / ${u.plan}`),
);

console.log("addToCart():");
store.setState({ cartCount: 1 }); // only CartBadge

console.log("\nswitch theme (nobody selected theme):");
store.setState({ theme: "dark" }); // nothing re-renders

console.log("\nupgrade to pro (name is unchanged):");
// Header stays quiet (its string is equal); banner flips; ProfileCard fires on the new object.
store.setState({ user: { name: "Ada", plan: "pro" } });

console.log("\nset cartCount to the same value:");
store.setState({ cartCount: 1 }); // nothing: Object.is says unchanged

console.log("\nre-set the same user with a fresh object literal:");
store.setState({ user: { name: "Ada", plan: "pro" } }); // only ProfileCard: new reference

console.log("\nHeader unmounts:");
stopHeader();
console.log("  subscribers left:", store.subscriberCount());

store.setState({ user: { name: "Grace", plan: "pro" } });
console.log("  (header did not re-render — it is gone)");
