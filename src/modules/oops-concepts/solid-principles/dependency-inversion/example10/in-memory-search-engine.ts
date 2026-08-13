// Title-only implementation of `SearchEngine` for tests and tiny datasets.

import { SearchDocument, SearchEngine } from "./search-engine";

export class InMemorySearchEngine implements SearchEngine {
  private readonly documents: SearchDocument[] = [];

  public index(document: SearchDocument): void {
    this.documents.push(document);
  }

  public query(term: string): readonly SearchDocument[] {
    const needle: string = term.toLowerCase();
    return this.documents.filter((document: SearchDocument) =>
      document.title.toLowerCase().includes(needle)
    );
  }

  public indexedCount(): number {
    return this.documents.length;
  }
}
