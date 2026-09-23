// Observer (frontend) — Example 2: a typed event bus for cross-component messages,
// plus the listener-leak bug that unmount cleanup exists to prevent.

export interface AppEvents {
  "cart:item-added": { sku: string; qty: number };
  "auth:logged-out": { reason: string };
  "modal:open": { id: string };
}

type Handler<E extends keyof AppEvents> = (payload: AppEvents[E]) => void;

// The public API is fully typed; internally one untyped bucket per event name is enough.
type AnyHandler = (payload: never) => void;

export class EventBus {
  private readonly handlers: Map<string, Set<AnyHandler>> = new Map<string, Set<AnyHandler>>();

  public on<E extends keyof AppEvents>(event: E, handler: Handler<E>): () => void {
    const key: string = String(event);
    let set: Set<AnyHandler> | undefined = this.handlers.get(key);
    if (set === undefined) {
      set = new Set<AnyHandler>();
      this.handlers.set(key, set);
    }
    const entry: AnyHandler = handler as AnyHandler;
    set.add(entry);
    // The returned function is what a useEffect cleanup would call.
    return (): void => {
      set.delete(entry);
    };
  }

  public emit<E extends keyof AppEvents>(event: E, payload: AppEvents[E]): void {
    const set: Set<AnyHandler> | undefined = this.handlers.get(String(event));
    if (set === undefined || set.size === 0) {
      console.log(`  (nobody is listening for ${String(event)})`);
      return;
    }
    // Copy, and isolate errors: one broken listener must not stop the rest.
    [...set].forEach((handler: AnyHandler): void => {
      try {
        (handler as Handler<E>)(payload);
      } catch (err) {
        console.log(`  [bus] a ${String(event)} listener threw: ${(err as Error).message}`);
      }
    });
  }

  public listenerCount(event: keyof AppEvents): number {
    return this.handlers.get(String(event))?.size ?? 0;
  }
}

// A component that mounts, subscribes, and (optionally) cleans up.
class CartBadgeComponent {
  private count: number = 0;
  private cleanup?: () => void;

  constructor(private readonly bus: EventBus, private readonly leaky: boolean) {}

  public mount(id: string): void {
    this.cleanup = this.bus.on("cart:item-added", (p): void => {
      this.count += p.qty;
      console.log(`  <CartBadge ${id}> now ${this.count}`);
    });
  }

  public unmount(): void {
    // The leaky version "forgets" the cleanup — the classic useEffect mistake.
    if (!this.leaky) {
      this.cleanup?.();
    }
  }
}

// ---- Demo ----

const bus: EventBus = new EventBus();

bus.on("auth:logged-out", (p): void => console.log(`  redirecting to /login (${p.reason})`));
bus.on("auth:logged-out", (): void => {
  throw new Error("analytics flush failed");
});
bus.on("auth:logged-out", (): void => console.log("  clearing local cache"));

console.log("logout fires three listeners, one of which throws:");
bus.emit("auth:logged-out", { reason: "session expired" });

console.log("\nnobody listens for modal:open yet:");
bus.emit("modal:open", { id: "settings" });

console.log("\n--- correct cleanup ---");
const good: CartBadgeComponent = new CartBadgeComponent(bus, false);
for (let i = 1; i <= 3; i++) {
  good.mount(`nav-${i}`);
  good.unmount();
}
console.log("cart listeners after 3 mount/unmount cycles:", bus.listenerCount("cart:item-added"));
bus.emit("cart:item-added", { sku: "p1", qty: 1 });

console.log("\n--- leaked cleanup (the useEffect bug) ---");
const bad: CartBadgeComponent = new CartBadgeComponent(bus, true);
for (let i = 1; i <= 3; i++) {
  bad.mount(`leak-${i}`);
  bad.unmount();
}
console.log("cart listeners after 3 mount/unmount cycles:", bus.listenerCount("cart:item-added"));
console.log("one add now fires three times:");
bus.emit("cart:item-added", { sku: "p2", qty: 1 });
