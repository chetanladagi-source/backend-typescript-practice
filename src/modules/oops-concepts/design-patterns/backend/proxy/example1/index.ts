// Proxy — Example 1: virtual proxy.
// The real engine loads a big dataset on construction. Most requests never need it,
// so the proxy defers creating it until the first actual call.

export interface ReportEngine {
  generate(month: string): string;
}

class RealReportEngine implements ReportEngine {
  private readonly dataset: number[];

  constructor() {
    console.log("  [engine] loading 12 months of data ... (expensive)");
    this.dataset = Array.from({ length: 12 }, (_: unknown, i: number): number => (i + 1) * 1000);
  }

  public generate(month: string): string {
    const index: number = Number(month.split("-")[1]) - 1;
    return `Report ${month}: revenue Rs.${this.dataset[index] ?? 0}`;
  }
}

class LazyReportEngine implements ReportEngine {
  private real?: RealReportEngine;

  public generate(month: string): string {
    // Creation happens here, not in the constructor.
    if (this.real === undefined) {
      console.log("  [proxy] first use, building the real engine");
      this.real = new RealReportEngine();
    }
    return this.real.generate(month);
  }
}

// ---- Demo ----

console.log("constructing the proxy (should be instant):");
const engine: ReportEngine = new LazyReportEngine();
console.log("  constructed, nothing loaded yet");

console.log("a request that never asks for a report:");
console.log("  served from cache/CDN, engine still untouched");

console.log("first real request:");
console.log("=>", engine.generate("2031-03"));

console.log("second request (engine already built):");
console.log("=>", engine.generate("2031-07"));

console.log("for contrast, the eager version pays the cost up front:");
const eager: ReportEngine = new RealReportEngine();
console.log("=>", eager.generate("2031-01"));
