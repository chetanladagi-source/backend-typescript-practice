// Cluster implementation of `SearchEngine`; REST calls are simulated with logs.

import { SearchDocument, SearchEngine } from "./search-engine";

export class ElasticSearchEngine implements SearchEngine {
  private readonly documents: SearchDocument[] = [];

  constructor(private readonly indexName: string) {}

  public index(document: SearchDocument): void {
    console.log(`[elastic] PUT /${this.indexName}/_doc/${document.id}`);
    this.documents.push(document);
  }

  public query(term: string): readonly SearchDocument[] {
    console.log(`[elastic] GET /${this.indexName}/_search?q=${term}`);
    const needle: string = term.toLowerCase();
    return this.documents.filter(
      (document: SearchDocument) =>
        document.title.toLowerCase().includes(needle) || document.body.toLowerCase().includes(needle)
    );
  }
}
