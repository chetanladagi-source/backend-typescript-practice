// Bad design: query rules cannot run without an Elasticsearch cluster.

interface RawHit {
  id: string;
  title: string;
}

class ElasticClient {
  private readonly hits: RawHit[] = [];

  public put(id: string, title: string): void {
    console.log(`[elastic] PUT /articles/_doc/${id}`);
    this.hits.push({ id, title });
  }

  public search(term: string): readonly RawHit[] {
    console.log(`[elastic] GET /articles/_search?q=${term}`);
    return this.hits.filter((hit: RawHit) => hit.title.toLowerCase().includes(term.toLowerCase()));
  }
}

export class SearchServiceViolation {
  // VIOLATION: the cluster client is created here, so the "term too short" rule can only be
  // exercised against a live Elasticsearch instance.
  private readonly elastic: ElasticClient = new ElasticClient();

  public indexAll(documents: readonly { id: string; title: string }[]): void {
    for (const document of documents) {
      this.elastic.put(document.id, document.title);
    }
  }

  public search(rawTerm: string): readonly string[] {
    const term: string = rawTerm.trim();
    if (term.length < 3) {
      console.log("[search] term too short, refusing to query");
      return [];
    }
    return this.elastic.search(term).map((hit: RawHit) => hit.title);
  }
}
