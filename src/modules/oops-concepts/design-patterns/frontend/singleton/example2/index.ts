// Singleton (frontend) — Example 2: an analytics client.
// Real trackers must accept events before init() finishes, so they buffer.

export interface AnalyticsEvent {
  name: string;
  props: Record<string, string | number>;
}

class Analytics {
  private static instance: Analytics | undefined;

  private writeKey?: string;
  private readonly queue: AnalyticsEvent[] = [];
  private sentCount: number = 0;

  private constructor() {}

  public static getInstance(): Analytics {
    return (Analytics.instance ??= new Analytics());
  }

  public init(writeKey: string): void {
    if (this.writeKey !== undefined) {
      console.log("  [analytics] already initialised, ignoring second init()");
      return;
    }
    this.writeKey = writeKey;
    console.log(`  [analytics] initialised with ${writeKey}`);
    // Flush anything that arrived before we were ready.
    const buffered: number = this.queue.length;
    while (this.queue.length > 0) {
      this.deliver(this.queue.shift() as AnalyticsEvent);
    }
    if (buffered > 0) {
      console.log(`  [analytics] flushed ${buffered} buffered events`);
    }
  }

  public track(name: string, props: Record<string, string | number> = {}): void {
    const event: AnalyticsEvent = { name, props };
    if (this.writeKey === undefined) {
      console.log(`  [analytics] buffering "${name}" (not initialised yet)`);
      this.queue.push(event);
      return;
    }
    this.deliver(event);
  }

  private deliver(event: AnalyticsEvent): void {
    this.sentCount++;
    console.log(`  [analytics] -> ${event.name} ${JSON.stringify(event.props)}`);
  }

  public stats(): string {
    return `sent=${this.sentCount} buffered=${this.queue.length}`;
  }
}

// The module-level export: how you would actually consume this in an app.
export const analytics: Analytics = Analytics.getInstance();

// ---- Demo ----

// A component fires an event during first paint, before the app bootstraps.
console.log("early page view, before bootstrap:");
analytics.track("page_view", { path: "/pricing" });
analytics.track("cta_visible", { id: "hero-signup" });

console.log("\napp bootstraps:");
analytics.init("wk_live_123");

console.log("\nnormal usage afterwards:");
Analytics.getInstance().track("cta_click", { id: "hero-signup" });

console.log("\na second init attempt (e.g. a remounted provider):");
analytics.init("wk_live_456");

console.log("\nsame instance everywhere?", analytics === Analytics.getInstance());
console.log("stats:", analytics.stats());
