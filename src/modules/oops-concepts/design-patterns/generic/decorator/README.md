# Decorator — Generic

Full theory and interview questions:
[`../../backend/decorator/README.md`](../../backend/decorator/README.md)

The single most famous example in the design-patterns literature: a `Coffee` and its add-ons.
Starbucks' menu is where this pattern is usually taught, and it is worth showing in that shape once
because interviewers reach for it.

| Example | Scenario |
| --- | --- |
| `example1` | Coffee base + `Milk`, `Sugar`, `Syrup` decorators, stackable in any order |
| `example2` | Payment fees (`Gst`, `ConvenienceFee`, `InternationalMarkup`) where order changes the total |
