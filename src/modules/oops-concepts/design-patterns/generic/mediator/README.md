# Mediator — Generic

Full theory, the god-object warning and interview questions:
[`../../backend/mediator/README.md`](../../backend/mediator/README.md)

The classic framing: a parking lot has an entry gate, an exit gate, a spot manager, and a display
board. Each component reacts to what the others do. Wire them directly and every one imports the
others; route it through a mediator and they only know about the mediator.

| Example | Scenario |
| --- | --- |
| `example1` | A `ParkingLotMediator` coordinating gates, spots and the display board |
| `example2` | A coffee `ShopMediator` between cashier, machine and pickup |
