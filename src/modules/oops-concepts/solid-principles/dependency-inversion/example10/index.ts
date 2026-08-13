// Runnable entry point contrasting the cluster-bound search with the injected one.

import { ElasticSearchEngine } from "./elastic-search-engine";
import { InMemorySearchEngine } from "./in-memory-search-engine";
import { SearchDocument } from "./search-engine";
import { SearchService } from "./search-service";
import { SearchServiceViolation } from "./search-service-violation";

const documents: readonly SearchDocument[] = [
  { id: "d1", title: "Dependency inversion in practice", body: "Depend on abstractions." },
  { id: "d2", title: "Indexing large catalogues", body: "Inversion keeps the policy stable." }
];

console.log("=== Violation ===");
const hardWired: SearchServiceViolation = new SearchServiceViolation();
hardWired.indexAll(documents);
console.log("[violation] hits:", hardWired.search("inversion"));

console.log("=== DIP applied ===");
const production: SearchService = new SearchService(new ElasticSearchEngine("articles"));
production.indexAll(documents);
console.log("[production] hits:", production.search("inversion"));

const engine: InMemorySearchEngine = new InMemorySearchEngine();
const underTest: SearchService = new SearchService(engine);
underTest.indexAll(documents);
console.log("[test] indexed:", engine.indexedCount());
console.log("[test] hits:", underTest.search("indexing"));
console.log("[test] short term:", underTest.search("in"));
