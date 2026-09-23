// Proxy (frontend) — Example 2: virtual proxy for a heavy component.
// The chart library is "downloaded" only when the component scrolls into view.

export interface Renderable {
  render(): string;
}

// The expensive real thing: pretend the constructor pulls in 300KB of charting code.
class HeavyChart implements Renderable {
  private readonly points: number[];

  constructor(private readonly title: string) {
    console.log(`  [bundle] downloading chart library for "${title}" (300KB)`);
    this.points = Array.from({ length: 12 }, (_: unknown, i: number): number => (i * 37) % 100);
  }

  public render(): string {
    const bars: string = this.points.map((p: number): string => "\u2588".repeat(Math.ceil(p / 20)) || ".").join(" ");
    return `[${this.title}] ${bars}`;
  }
}

// Virtual proxy: same interface, but nothing heavy happens until render().
class LazyChart implements Renderable {
  private real?: HeavyChart;

  constructor(private readonly title: string) {}

  public render(): string {
    if (this.real === undefined) {
      this.real = new HeavyChart(this.title);
    }
    return this.real.render();
  }

  // What the UI shows before the real component exists.
  public placeholder(): string {
    return `[${this.title}] \u2591\u2591\u2591\u2591\u2591\u2591 loading…`;
  }

  public isLoaded(): boolean {
    return this.real !== undefined;
  }
}

// A stand-in for IntersectionObserver.
class Viewport {
  private readonly widgets: Map<string, LazyChart> = new Map<string, LazyChart>();

  public mount(id: string, chart: LazyChart): void {
    this.widgets.set(id, chart);
    console.log(`  mounted ${id}: ${chart.placeholder()}`);
  }

  public scrollTo(id: string): void {
    const chart: LazyChart | undefined = this.widgets.get(id);
    if (chart === undefined) {
      return;
    }
    console.log(`\nscrolled to ${id}:`);
    console.log(`  ${chart.render()}`);
  }

  public loadedCount(): number {
    return [...this.widgets.values()].filter((c: LazyChart): boolean => c.isLoaded()).length;
  }
}

// ---- Demo ----

const page: Viewport = new Viewport();

console.log("page loads with four charts below the fold:");
page.mount("revenue", new LazyChart("Revenue"));
page.mount("signups", new LazyChart("Signups"));
page.mount("churn", new LazyChart("Churn"));
page.mount("latency", new LazyChart("Latency"));

console.log("\ncharts actually downloaded so far:", page.loadedCount()); // 0

page.scrollTo("revenue");
page.scrollTo("churn");

console.log("\ncharts downloaded after scrolling:", page.loadedCount()); // 2

// Re-rendering an already-loaded chart does not download it again.
page.scrollTo("revenue");
console.log("\nstill only downloaded:", page.loadedCount());
