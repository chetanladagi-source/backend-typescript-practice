// Flyweight (frontend) — Example 1: shared cell styles in a big table.
// 50,000 cells, but only a few distinct visual treatments.

// Intrinsic state: shared and immutable.
export class CellStyle {
  constructor(
    public readonly align: "left" | "right" | "center",
    public readonly color: string,
    public readonly weight: "normal" | "bold",
    public readonly mono: boolean,
  ) {
    Object.freeze(this); // shared objects must never be mutated
  }

  public toCss(): string {
    return `text-align:${this.align};color:${this.color};font-weight:${this.weight}${this.mono ? ";font-family:monospace" : ""}`;
  }
}

class CellStyleFactory {
  private static readonly pool: Map<string, CellStyle> = new Map<string, CellStyle>();
  public static created: number = 0;

  public static get(
    align: "left" | "right" | "center",
    color: string,
    weight: "normal" | "bold",
    mono: boolean,
  ): CellStyle {
    // The key must cover every intrinsic field.
    const key: string = `${align}|${color}|${weight}|${mono}`;
    let style: CellStyle | undefined = CellStyleFactory.pool.get(key);
    if (style === undefined) {
      style = new CellStyle(align, color, weight, mono);
      CellStyleFactory.pool.set(key, style);
      CellStyleFactory.created++;
    }
    return style;
  }

  public static poolSize(): number {
    return CellStyleFactory.pool.size;
  }
}

// Extrinsic state: the value is unique per cell, the style is shared.
class Cell {
  constructor(
    public readonly value: string,
    public readonly style: CellStyle,
  ) {}

  public render(): string {
    return `<td style="${this.style.toCss()}">${this.value}</td>`;
  }
}

// Column definitions decide which shared style each cell gets.
const columns: { name: string; style: () => CellStyle }[] = [
  { name: "id", style: (): CellStyle => CellStyleFactory.get("left", "#6b7280", "normal", true) },
  { name: "product", style: (): CellStyle => CellStyleFactory.get("left", "#111827", "bold", false) },
  { name: "price", style: (): CellStyle => CellStyleFactory.get("right", "#111827", "normal", true) },
  { name: "stock", style: (): CellStyle => CellStyleFactory.get("center", "#dc2626", "bold", false) },
];

// ---- Demo ----

const rowCount: number = 12_500;
const cells: Cell[] = [];

for (let r = 0; r < rowCount; r++) {
  columns.forEach((col: { name: string; style: () => CellStyle }): void => {
    cells.push(new Cell(`${col.name}-${r}`, col.style()));
  });
}

console.log("cells rendered      :", cells.length);
console.log("CellStyle objects   :", CellStyleFactory.created);
console.log("pool size           :", CellStyleFactory.poolSize());

console.log("\nfirst row:");
cells.slice(0, 4).forEach((c: Cell): void => console.log("  " + c.render()));

// Every cell in a column shares one style object.
console.log("\nsame style object across rows?", cells[0].style === cells[4].style); // true
console.log("different style per column?  ", cells[0].style !== cells[1].style); // true

// Frozen, because a single mutation would restyle 12,500 cells at once.
const shared: CellStyle = cells[0].style;
try {
  (shared as { color: string }).color = "hotpink";
} catch {
  // ignored in sloppy mode, throws in strict mode — either way the value is unchanged
}
console.log("still safe after a mutation attempt?", cells[4].style.color === "#6b7280");
