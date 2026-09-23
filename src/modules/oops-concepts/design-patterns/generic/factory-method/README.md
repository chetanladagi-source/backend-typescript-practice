# Factory Method — Generic

Full theory and interview questions:
[`../../backend/factory-method/README.md`](../../backend/factory-method/README.md)

The classic framing: an HR system has to construct Engineer, Manager and Intern from a role string
read from a CSV. Callers should not know the class names.

| Example | Scenario |
| --- | --- |
| `example1` | An `EmployeeFactory` returning the right subclass by role |
| `example2` | A `TicketFactory` issuing hourly / daily / valet parking tickets |
