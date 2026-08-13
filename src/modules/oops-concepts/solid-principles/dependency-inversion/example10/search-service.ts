// High-level policy: query hygiene and result shaping over any `SearchEngine`.

import { SearchDocument, SearchEngine } from "./search-engine";

export class SearchService {
  private static readonly minTermLength: number = 3;

  constructor(private readonly engine: SearchEngine) {}

  public indexAll(documents: readonly SearchDocument[]): void {
    for (const document of documents) {
      this.engine.index(document);
    }
  }

  public search(rawTerm: string): readonly string[] {
    const term: string = rawTerm.trim();
    if (term.length < SearchService.minTermLength) {
      console.log("[search] term too short, refusing to query");
      return [];
    }
    const titles: string[] = this.engine.query(term).map((document: SearchDocument) => document.title);
    console.log(`[search] "${term}" matched ${titles.length}`);
    return titles;
  }
}
