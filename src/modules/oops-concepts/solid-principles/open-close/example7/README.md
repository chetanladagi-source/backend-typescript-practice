# Example 7 - Tax calculation

Scenario: invoices are taxed per country, starting with India and the US.

Violation: `LegacyTaxCalculator` switches on the country code, so a UK launch
requires editing billing code that is already certified for two markets. Tax
rules also change independently per country, which keeps reopening one file.

Fix: `TaxRule` exposes `taxFor()`, each jurisdiction owns its own class, and
`TaxCalculator` applies whichever rule it is given.

Takeaway: a market launch becomes a new file plus a wiring change at the edge,
never a modification of an existing tax rule.
