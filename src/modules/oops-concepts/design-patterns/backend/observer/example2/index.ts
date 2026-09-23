// Observer — Example 2: a typed event emitter with error isolation.
// Closer to how you would really write this in TypeScript.

// The event map gives us compile-time checked event names AND payloads.
export interface AppEvents {
  "user.registered": { userId: string; email: string };
  "user.deleted": { userId: string };
  "payment.failed": { orderId: string; reason: string };
}

type Handler<E extends keyof AppEvents> = (payload: AppEvents[E]) => void;

export class TypedEmitter {
  private readonly handlers: { [E in keyof AppEvents]?: Handler<E>[] } = {};

  public on<E extends keyof AppEvents>(event: E, handler: Handler<E>): () => void {
    const list: Handler<E>[] = (this.handlers[event] ??= []);
    list.push(handler);
    return (): void => {
      const i: number = list.indexOf(handler);
      if (i !== -1) {
        list.splice(i, 1);
      }
    };
  }

  public emit<E extends keyof AppEvents>(event: E, payload: AppEvents[E]): void {
    const list: Handler<E>[] | undefined = this.handlers[event];
    if (list === undefined) {
      console.log(`  (no listeners for ${String(event)})`);
      return;
    }
    // One bad listener must not stop the others.
    [...list].forEach((handler: Handler<E>): void => {
      try {
        handler(payload);
      } catch (err) {
        console.log(`  [emitter] listener for ${String(event)} threw: ${(err as Error).message}`);
      }
    });
  }
}

// ---- Demo ----

const events: TypedEmitter = new TypedEmitter();

events.on("user.registered", (p): void => console.log(`  [welcome] emailing ${p.email}`));
events.on("user.registered", (): void => {
  throw new Error("CRM service unreachable");
});
events.on("user.registered", (p): void => console.log(`  [crm] contact created for ${p.userId}`));

events.on("payment.failed", (p): void => console.log(`  [alert] ${p.orderId} failed: ${p.reason}`));

console.log("emitting user.registered:");
events.emit("user.registered", { userId: "u1", email: "ada@example.com" });

console.log("emitting payment.failed:");
events.emit("payment.failed", { orderId: "ORD-9", reason: "insufficient funds" });

console.log("emitting an event nobody listens to:");
events.emit("user.deleted", { userId: "u1" });

// TypeScript rejects these at compile time:
// events.emit("user.registered", { userId: "u1" });   // missing `email`
// events.emit("user.typo", { userId: "u1" });         // unknown event name
