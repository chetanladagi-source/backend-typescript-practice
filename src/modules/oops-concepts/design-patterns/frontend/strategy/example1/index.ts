// Strategy (frontend) — Example 1: data-table sorting.
// Array.prototype.sort already takes a strategy; we just name and compose them.

export interface Row {
  name: string;
  price: number;
  rating: number;
  releasedAt: string;
  inStock: boolean;
}

export type Comparator<T> = (a: T, b: T) => number;

// --- Individual strategies ---

const byName: Comparator<Row> = (a, b) => a.name.localeCompare(b.name);
const byPrice: Comparator<Row> = (a, b) => a.price - b.price;
const byRating: Comparator<Row> = (a, b) => a.rating - b.rating;
const byDate: Comparator<Row> = (a, b) => Date.parse(a.releasedAt) - Date.parse(b.releasedAt);
// Booleans need coercion; `true` should come first.
const byAvailability: Comparator<Row> = (a, b) => Number(b.inStock) - Number(a.inStock);

// --- Combinators: strategies that build strategies ---

const descending =
  <T>(comparator: Comparator<T>): Comparator<T> =>
  (a: T, b: T): number =>
    -comparator(a, b);

// Multi-column sort: fall through to the next comparator only on a tie.
const thenBy =
  <T>(...comparators: Comparator<T>[]): Comparator<T> =>
  (a: T, b: T): number => {
    for (const compare of comparators) {
      const result: number = compare(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };

const registry: Record<string, Comparator<Row>> = {
  name: byName,
  price: byPrice,
  rating: byRating,
  releasedAt: byDate,
};

// Context: knows nothing about any specific column.
function sortRows(rows: Row[], comparator: Comparator<Row>): Row[] {
  return [...rows].sort(comparator); // copy, never mutate props
}

const show = (label: string, rows: Row[]): void => {
  console.log(`\n${label}`);
  rows.forEach((r: Row): void =>
    console.log(
      `  ${r.name.padEnd(12)} Rs.${String(r.price).padStart(5)}  ${r.rating}\u2605  ${r.releasedAt}  ${r.inStock ? "in stock" : "sold out"}`,
    ),
  );
};

// ---- Demo ----

const rows: Row[] = [
  { name: "Keyboard", price: 6499, rating: 4.5, releasedAt: "2030-06-01", inStock: true },
  { name: "Monitor", price: 12999, rating: 4.5, releasedAt: "2031-02-10", inStock: false },
  { name: "Mouse", price: 1999, rating: 4.8, releasedAt: "2029-11-20", inStock: true },
  { name: "Webcam", price: 3299, rating: 4.2, releasedAt: "2031-02-10", inStock: false },
];

show("original", rows);

// The user clicks a column header: look the strategy up by key.
const clicked: string = "price";
show(`sorted by "${clicked}"`, sortRows(rows, registry[clicked]));

show("price, descending", sortRows(rows, descending(registry.price)));

// Composition is where this beats a switch statement.
show("in-stock first, then highest rated, then cheapest", sortRows(rows, thenBy(byAvailability, descending(byRating), byPrice)));

show("same release date? break the tie by name", sortRows(rows, thenBy(byDate, byName)));
