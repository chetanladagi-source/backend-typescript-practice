// Builder (frontend) — Example 2: URL state for a filterable list page.
// Filters live in the query string so the page is shareable and bookmarkable.

export interface UrlState {
  readonly path: string;
  readonly query: string;
  readonly full: string;
}

class UrlBuilder {
  private readonly filters: Map<string, string[]> = new Map<string, string[]>();
  private sortKey?: string;
  private sortDir: "asc" | "desc" = "asc";
  private page: number = 1;
  private searchTerm?: string;

  constructor(private readonly path: string) {}

  // Multi-select filters accumulate rather than overwrite: ?tag=a&tag=b
  public filter(key: string, value: string): this {
    const existing: string[] = this.filters.get(key) ?? [];
    if (!existing.includes(value)) {
      existing.push(value);
    }
    this.filters.set(key, existing);
    return this;
  }

  public search(term: string): this {
    this.searchTerm = term.trim() === "" ? undefined : term.trim();
    return this;
  }

  public sortBy(key: string, dir: "asc" | "desc" = "asc"): this {
    this.sortKey = key;
    this.sortDir = dir;
    return this;
  }

  public goToPage(page: number): this {
    this.page = Math.max(1, page);
    return this;
  }

  public build(): UrlState {
    const parts: string[] = [];

    // Sorted keys keep the URL stable, so the same filters always produce the
    // same string — which matters for cache keys and for React Query.
    [...this.filters.entries()]
      .sort(([a], [b]): number => a.localeCompare(b))
      .forEach(([key, values]: [string, string[]]): void => {
        values.forEach((v: string): void => {
          parts.push(`${key}=${encodeURIComponent(v)}`);
        });
      });

    if (this.searchTerm !== undefined) {
      parts.push(`q=${encodeURIComponent(this.searchTerm)}`);
    }
    if (this.sortKey !== undefined) {
      parts.push(`sort=${this.sortKey}:${this.sortDir}`);
    }
    // Omit defaults so the common URL stays clean.
    if (this.page > 1) {
      parts.push(`page=${this.page}`);
    }

    const query: string = parts.join("&");
    return { path: this.path, query, full: query === "" ? this.path : `${this.path}?${query}` };
  }
}

export function url(path: string): UrlBuilder {
  return new UrlBuilder(path);
}

// ---- Demo ----

console.log(url("/products").build().full);

console.log(
  url("/products")
    .filter("category", "audio")
    .filter("category", "peripherals")
    .filter("brand", "Dell")
    .search("wireless keyboard")
    .sortBy("price", "desc")
    .goToPage(3)
    .build().full,
);

// Stable ordering: filters added in a different order produce an identical URL.
const a: string = url("/products").filter("brand", "Dell").filter("category", "audio").build().query;
const b: string = url("/products").filter("category", "audio").filter("brand", "Dell").build().query;
console.log("\nstable across insertion order?", a === b, `\n  ${a}`);

// Defaults omitted: page 1 and no sort produce the clean URL.
console.log("\ndefaults omitted:", url("/products").filter("category", "audio").goToPage(1).build().full);
