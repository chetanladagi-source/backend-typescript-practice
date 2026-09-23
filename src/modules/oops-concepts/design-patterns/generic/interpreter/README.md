# Interpreter — Generic

Full theory, the sandbox-by-construction argument and interview questions:
[`../../backend/interpreter/README.md`](../../backend/interpreter/README.md)

The classic framing: HR wants a saved-search box on the employee list —
`role == "manager" && salary > 100000`. The query strings come from users, so they cannot be
`eval`'d. An interpreter over a tiny grammar can only do what its node classes allow.

| Example | Scenario |
| --- | --- |
| `example1` | A boolean-expression interpreter filtering Employee records |
