// Flyweight (frontend) — Example 2: an icon sprite registry.
// Extrinsic state (size, colour, position) is passed as ARGUMENTS, never stored.

export class IconSprite {
  // Intrinsic: the path data, identical everywhere this icon appears.
  constructor(
    public readonly name: string,
    public readonly viewBox: string,
    public readonly pathData: string,
  ) {}

  // Extrinsic state arrives per call site and is never kept on the flyweight.
  public renderAt(sizePx: number, color: string, label: string): string {
    return `<svg width="${sizePx}" height="${sizePx}" viewBox="${this.viewBox}" fill="${color}" role="img" aria-label="${label}"><path d="${this.pathData}"/></svg>`;
  }
}

class IconRegistry {
  private static readonly pool: Map<string, IconSprite> = new Map<string, IconSprite>();
  private static readonly definitions: Record<string, [string, string]> = {
    check: ["0 0 16 16", "M2 8l4 4 8-8"],
    trash: ["0 0 16 16", "M3 4h10l-1 10H4L3 4zM6 2h4v2H6z"],
    star: ["0 0 16 16", "M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z"],
  };

  public static get(name: string): IconSprite {
    let sprite: IconSprite | undefined = IconRegistry.pool.get(name);
    if (sprite === undefined) {
      const [viewBox, pathData] = IconRegistry.definitions[name] ?? ["0 0 16 16", ""];
      console.log(`  [registry] parsing sprite "${name}" (once)`);
      sprite = new IconSprite(name, viewBox, pathData);
      IconRegistry.pool.set(name, sprite);
    }
    return sprite;
  }

  public static poolSize(): number {
    return IconRegistry.pool.size;
  }
}

// A list row holds the icon NAME and its own extrinsic display state.
interface Row {
  title: string;
  icon: string;
  iconSize: number;
  iconColor: string;
}

function renderRow(row: Row): string {
  const sprite: IconSprite = IconRegistry.get(row.icon);
  return `  ${sprite.renderAt(row.iconSize, row.iconColor, row.icon)} ${row.title}`;
}

// ---- Demo ----

const rows: Row[] = [
  { title: "Deploy succeeded", icon: "check", iconSize: 16, iconColor: "#16a34a" },
  { title: "Marked as favourite", icon: "star", iconSize: 20, iconColor: "#f59e0b" },
  { title: "Draft removed", icon: "trash", iconSize: 16, iconColor: "#dc2626" },
  { title: "Build passed", icon: "check", iconSize: 12, iconColor: "#16a34a" },
  { title: "Pinned to top", icon: "star", iconSize: 16, iconColor: "#6b7280" },
];

console.log("rendering rows:");
rows.forEach((r: Row): void => console.log(renderRow(r)));

console.log("\nicon usages :", rows.length);
console.log("sprites held:", IconRegistry.poolSize()); // 3, not 5

// Same sprite object, different size and colour per usage.
console.log("shared sprite?", IconRegistry.get("check") === IconRegistry.get("check")); // true

// A virtualised list re-rendering 10,000 rows still parses nothing new.
console.log("\nscrolling a virtualised list (10,000 renders):");
for (let i = 0; i < 10_000; i++) {
  IconRegistry.get("star").renderAt(16, "#f59e0b", "star");
}
console.log("sprites held after scrolling:", IconRegistry.poolSize());
