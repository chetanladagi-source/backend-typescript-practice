# Example 9 - ReadOnlyCloudStorage extends Storage

**Scenario:** A backup routine saves a report through the `Storage` base type and reads it back to confirm.

**Broken contract:** `Storage.save()` guarantees that a subsequent `load(key)` returns the saved content. `ReadOnlyCloudStorage` swallows the write and logs instead, so the postcondition silently fails and the backup only looks successful until verification runs.

**Fix:** Split into `ReadableStorage` and `WritableStorage`. `MemoryStorage` implements both, `ArchiveStorage` only reads, and the backup service accepts nothing but a writable backend.

**Takeaway:** Silent no-ops are the most dangerous LSP violation because they produce no error at the call site. Make interfaces honest so an unsupported write cannot even be requested.
