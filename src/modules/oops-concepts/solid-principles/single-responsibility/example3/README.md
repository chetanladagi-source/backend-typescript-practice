# Example 3 — Report generation

**Scenario:** build a sales report: fetch the rows, format them, write the export file.

**Violation:** `ReportGod` hard-codes the query, the CSV layout and the file write in one method.
Switching CSV to JSON, or the data store to another table, means editing the same class, and the
formatting logic can never be reused by another report.

**Refactor:** `SalesDataSource` owns retrieval, `CsvReportFormatter` owns rendering,
`ReportFileWriter` owns the export target, and `ReportGenerator` only coordinates them.

**Takeaway:** a pipeline of "get data, shape data, ship data" is three responsibilities. Keep each
stage swappable so a new output format never risks breaking the query.
