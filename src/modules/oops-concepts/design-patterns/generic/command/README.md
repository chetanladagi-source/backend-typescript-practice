# Command — Generic

Full theory, the Command/Memento distinction and interview questions:
[`../../backend/command/README.md`](../../backend/command/README.md)

The classic framing: a barista's order queue. A customer request becomes a series of small,
reversible steps — grind, brew, pour, add milk. Each step is a Command; the barista is the
invoker; the espresso machine is the receiver.

| Example | Scenario |
| --- | --- |
| `example1` | A barista command queue with undo |
