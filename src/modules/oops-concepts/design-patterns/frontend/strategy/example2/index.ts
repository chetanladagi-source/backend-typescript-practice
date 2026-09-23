// Strategy (frontend) — Example 2: animation easing.
// The tween engine is fixed; the easing curve is injected.

// t goes from 0 to 1 and the function returns eased progress, also 0 to 1.
export type Easing = (t: number) => number;

const linear: Easing = (t) => t;
const easeInQuad: Easing = (t) => t * t;
const easeOutQuad: Easing = (t) => t * (2 - t);
const easeInOutQuad: Easing = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

// A spring-like overshoot: goes past 1 before settling. Useful for "pop" effects.
const easeOutBack: Easing = (t) => {
  const c1: number = 1.70158;
  const c3: number = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

// Context: interpolates a value over N frames using whichever curve it is given.
function tween(from: number, to: number, frames: number, easing: Easing): number[] {
  return Array.from({ length: frames }, (_: unknown, i: number): number => {
    const t: number = i / (frames - 1);
    return Math.round(from + (to - from) * easing(t));
  });
}

const sparkline = (values: number[], max: number): string => {
  const blocks: string[] = ["\u2581", "\u2582", "\u2583", "\u2584", "\u2585", "\u2586", "\u2587", "\u2588"];
  return values
    .map((v: number): string => blocks[Math.min(blocks.length - 1, Math.max(0, Math.round((v / max) * 7)))])
    .join("");
};

// ---- Demo ----

const curves: [string, Easing][] = [
  ["linear      ", linear],
  ["easeInQuad  ", easeInQuad],
  ["easeOutQuad ", easeOutQuad],
  ["easeInOutQuad", easeInOutQuad],
  ["easeOutBack ", easeOutBack],
];

console.log("sliding a panel from x=0 to x=100 over 20 frames:\n");
curves.forEach(([name, easing]: [string, Easing]): void => {
  const frames: number[] = tween(0, 100, 20, easing);
  console.log(`${name} ${sparkline(frames, 100)}  end=${frames[frames.length - 1]}`);
});

// Same engine, a completely different animated property.
console.log("\nfading opacity 0 -> 100 with easeOutQuad:");
console.log("  " + tween(0, 100, 10, easeOutQuad).join(", "));

// Note easeOutBack overshoots past the target before settling.
console.log("\neaseOutBack overshoots on purpose (values above 100):");
console.log("  " + tween(0, 100, 12, easeOutBack).join(", "));
