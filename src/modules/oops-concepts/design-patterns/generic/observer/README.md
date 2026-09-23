# Observer — Generic

Full theory, the leak/error traps and interview questions:
[`../../backend/observer/README.md`](../../backend/observer/README.md)

The classic framing: an entrance display board, a mobile app, and an aggregation service all want
to know when parking-lot occupancy changes. The lot should not care who is listening; the
listeners should not have to poll.

| Example | Scenario |
| --- | --- |
| `example1` | A parking-lot Subject notifying multiple typed Observers |
| `example2` | A coffee `OrderBoard` notifying display, app and (broken) loyalty |
