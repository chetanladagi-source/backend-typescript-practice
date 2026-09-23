// Mediator (generic) — Example 2: cashier, machine and pickup coordinated by one barista.

class Cashier {
  constructor(private readonly desk: ShopMediator) {}
  public takeOrder(drink: string): void {
    console.log(`\n[Cashier] paid for ${drink}`);
    this.desk.orderPaid(drink);
  }
}

class EspressoBar {
  constructor(private readonly desk: ShopMediator) {}
  public make(drink: string, ticket: number): void {
    console.log(`[Machine] brewing ${drink} as #${ticket}`);
    this.desk.drinkReady(drink, ticket);
  }
}

class PickupCounter {
  public callOut(drink: string, ticket: number): void {
    console.log(`[Pickup] #${ticket} ${drink} is ready`);
  }
}

export class ShopMediator {
  private ticket: number = 0;
  private machine?: EspressoBar;
  private pickup?: PickupCounter;

  public bind(machine: EspressoBar, pickup: PickupCounter): void {
    this.machine = machine;
    this.pickup = pickup;
  }

  public orderPaid(drink: string): void {
    this.ticket += 1;
    this.machine?.make(drink, this.ticket);
  }

  public drinkReady(drink: string, ticket: number): void {
    this.pickup?.callOut(drink, ticket);
  }
}

// ---- Demo ----

const desk: ShopMediator = new ShopMediator();
const cashier: Cashier = new Cashier(desk);
const machine: EspressoBar = new EspressoBar(desk);
const pickup: PickupCounter = new PickupCounter();
desk.bind(machine, pickup);

cashier.takeOrder("latte");
cashier.takeOrder("espresso");

// Cashier does not import the machine. Machine does not import the pickup board.
// Adding a loyalty stamp is one new call inside the mediator, not three new arrows.
