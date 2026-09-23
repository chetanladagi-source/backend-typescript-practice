// Proxy (frontend) — Example 1: Vue-3-style reactivity with the native Proxy.
// The `get` trap records which keys an effect read; `set` re-runs those effects.

type Effect = () => void;

// Which effect is running right now, so `get` knows who to subscribe.
let activeEffect: Effect | undefined;

// target -> key -> set of effects that read it
const depsMap: WeakMap<object, Map<string, Set<Effect>>> = new WeakMap();

function track(target: object, key: string): void {
  if (activeEffect === undefined) {
    return;
  }
  let keys: Map<string, Set<Effect>> | undefined = depsMap.get(target);
  if (keys === undefined) {
    keys = new Map<string, Set<Effect>>();
    depsMap.set(target, keys);
  }
  let effects: Set<Effect> | undefined = keys.get(key);
  if (effects === undefined) {
    effects = new Set<Effect>();
    keys.set(key, effects);
  }
  effects.add(activeEffect);
}

function trigger(target: object, key: string): void {
  const effects: Set<Effect> | undefined = depsMap.get(target)?.get(key);
  effects?.forEach((effect: Effect): void => effect());
}

export function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(obj: T, key: string | symbol, receiver: unknown): unknown {
      if (typeof key === "string") {
        track(obj, key);
      }
      return Reflect.get(obj, key, receiver);
    },
    set(obj: T, key: string | symbol, value: unknown, receiver: unknown): boolean {
      const previous: unknown = Reflect.get(obj, key, receiver);
      const ok: boolean = Reflect.set(obj, key, value, receiver);
      // Only notify on a real change, or every assignment re-renders.
      if (typeof key === "string" && previous !== value) {
        trigger(obj, key);
      }
      return ok;
    },
  });
}

// Run an effect once, recording everything it reads.
export function watchEffect(effect: Effect): void {
  const wrapped: Effect = (): void => {
    activeEffect = wrapped;
    effect();
    activeEffect = undefined;
  };
  wrapped();
}

// ---- Demo ----

const state = reactive({ firstName: "Ada", lastName: "Lovelace", age: 36, unused: "ignored" });

console.log("--- registering effects ---");
watchEffect((): void => {
  console.log(`  <Header> ${state.firstName} ${state.lastName}`);
});
watchEffect((): void => {
  console.log(`  <AgeBadge> ${state.age} years old`);
});

console.log("\nstate.firstName = 'Grace'  (only the header depends on it)");
state.firstName = "Grace";

console.log("\nstate.age = 37  (only the badge depends on it)");
state.age = 37;

console.log("\nstate.unused = 'still ignored'  (nothing read it, so nothing re-runs)");
state.unused = "still ignored";

console.log("\nstate.age = 37 again  (same value, no re-render)");
state.age = 37;

// Unlike Vue 2's Object.defineProperty, adding a brand-new key is also tracked.
console.log("\nadding a new property is intercepted too:");
watchEffect((): void => {
  console.log(`  <Nickname> ${(state as Record<string, unknown>).nickname ?? "(none)"}`);
});
(state as Record<string, unknown>).nickname = "The Countess";
