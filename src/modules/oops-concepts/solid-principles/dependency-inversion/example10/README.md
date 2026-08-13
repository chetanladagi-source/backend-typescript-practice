# Example 10 — Article search

**Scenario:** `SearchService` rejects too-short terms, queries an engine and returns matching
titles.

**Before:** the arrow pointed `SearchService -> ElasticClient`. Even the "term too short" rule
needed a live cluster to be exercised.

**After:** the service depends on the `SearchEngine` interface. `ElasticSearchEngine` talks to a
cluster and `InMemorySearchEngine` filters an array.

**Takeaway:** the valuable logic here is the query hygiene, not the transport. Inverting the engine
lets that logic be tested in milliseconds.
