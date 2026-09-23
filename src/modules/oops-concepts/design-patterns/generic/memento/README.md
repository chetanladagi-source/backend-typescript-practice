# Memento — Generic

Full theory, the Command/Memento distinction and interview questions:
[`../../backend/memento/README.md`](../../backend/memento/README.md)

The classic framing: a customer is building a complicated coffee order — extra shot, vanilla
syrup, oat milk — and asks "actually, take me back to what I had two changes ago". You do not want
to recompute; you want to *restore*.

| Example | Scenario |
| --- | --- |
| `example1` | Save/restore a coffee-order draft, with a caretaker that never peeks inside the memento |
