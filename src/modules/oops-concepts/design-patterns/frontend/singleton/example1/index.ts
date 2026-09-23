// Singleton (frontend) — Example 1: a global theme store.
// Also demonstrates why this exact pattern breaks under server-side rendering.

export type ThemeName = "light" | "dark";

class ThemeStore {
  private static instance: ThemeStore | undefined;

  private theme: ThemeName = "light";
  private readonly listeners: Set<(theme: ThemeName) => void> = new Set();

  private constructor() {}

  public static getInstance(): ThemeStore {
    if (ThemeStore.instance === undefined) {
      ThemeStore.instance = new ThemeStore();
    }
    return ThemeStore.instance;
  }

  public get(): ThemeName {
    return this.theme;
  }

  public set(theme: ThemeName): void {
    this.theme = theme;
    this.listeners.forEach((l: (t: ThemeName) => void): void => l(theme));
  }

  public subscribe(listener: (theme: ThemeName) => void): () => void {
    this.listeners.add(listener);
    return (): void => {
      this.listeners.delete(listener);
    };
  }
}

// ---- Demo ----

// Two unrelated "components" reach for the store independently.
const header: ThemeStore = ThemeStore.getInstance();
const sidebar: ThemeStore = ThemeStore.getInstance();
console.log("same store?", header === sidebar); // true

sidebar.subscribe((t: ThemeName): void => console.log(`  <Sidebar> re-rendering in ${t}`));
header.subscribe((t: ThemeName): void => console.log(`  <Header> re-rendering in ${t}`));

console.log('user clicks the theme toggle:');
header.set("dark");
console.log("sidebar reads:", sidebar.get());

// --- The SSR trap ---
// On the server the module is cached per PROCESS, not per request. A singleton
// holding user state is therefore shared by every visitor.
console.log("\n--- why this breaks in SSR ---");

class UserSession {
  private static instance: UserSession | undefined;
  public userName: string = "anonymous";

  public static getInstance(): UserSession {
    return (UserSession.instance ??= new UserSession());
  }
}

// Request 1 from Ada
UserSession.getInstance().userName = "ada";
console.log("request 1 renders for:", UserSession.getInstance().userName);

// Request 2 from a completely different visitor, same Node process
console.log("request 2 renders for:", UserSession.getInstance().userName, "<-- leaked Ada's session");

// The fix: request-scoped state (React context, AsyncLocalStorage, a per-request
// container) instead of a module singleton for anything user-specific.
