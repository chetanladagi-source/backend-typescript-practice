# Example 7 — Application config

**Scenario:** load app settings: read the raw source, parse it into key/value pairs, validate it.

**Violation:** `ConfigGod` hard-codes the raw text inside `load()` and interleaves parsing with
validation. You cannot test the parser against a different input, cannot switch `key=value` to JSON,
and cannot reuse the validation rules elsewhere.

**Refactor:** `ConfigSource` supplies the text, `ConfigParser` interprets the format,
`ConfigValidator` enforces the rules, and `AppConfigLoader` sequences the three.

**Takeaway:** separating the source from the format from the rules makes each independently testable —
and the source becomes injectable, so tests need no real file or environment.
