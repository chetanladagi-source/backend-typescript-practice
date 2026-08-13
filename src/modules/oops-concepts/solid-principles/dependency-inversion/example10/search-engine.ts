// Abstraction the search policy depends on.

export interface SearchDocument {
  id: string;
  title: string;
  body: string;
}

export interface SearchEngine {
  index(document: SearchDocument): void;
  query(term: string): readonly SearchDocument[];
}
