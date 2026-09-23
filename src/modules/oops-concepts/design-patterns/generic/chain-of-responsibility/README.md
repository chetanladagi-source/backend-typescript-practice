# Chain of Responsibility — Generic

Full theory and interview questions:
[`../../backend/chain-of-responsibility/README.md`](../../backend/chain-of-responsibility/README.md)

The classic framing: before a payment is actually charged, it goes through a pipeline —
fraud check, KYC verification, funds check, 3-D Secure. Each check either passes it along or
rejects it. Written as one nested `if`, the code becomes unreadable and every new check touches
every line.

| Example | Scenario |
| --- | --- |
| `example1` | A payment authorization pipeline built from linked handlers |
