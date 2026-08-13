# Example 6 - Report export

Scenario: a report can be downloaded as CSV or JSON, and XML is requested later.

Violation: `LegacyReportExporter.export()` switches on the format string, so the
XML request lands as an edit inside a class that already serialises production
reports, and the switch becomes the one place every format competes for.

Fix: a `ReportExporter` interface plus an `ExporterRegistry` that maps a format
name to an implementation. Lookup replaces branching.

Takeaway: `XmlExporter` is registered from `index.ts` at runtime, so adding a
format is a registration call rather than a code change.
