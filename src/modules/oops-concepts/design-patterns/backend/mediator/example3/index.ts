// Mediator — Example 3: an auction house.
// Bidders never see each other; the house validates and broadcasts.

export interface AuctionMediator {
  placeBid(bidder: Bidder, amount: number): void;
  join(bidder: Bidder): void;
}

export abstract class Bidder {
  protected house?: AuctionMediator;

  constructor(public readonly name: string, public readonly maxBudget: number) {}

  public setMediator(house: AuctionMediator): void {
    this.house = house;
  }

  public bid(amount: number): void {
    this.house?.placeBid(this, amount);
  }

  public abstract onOutbid(leader: string, amount: number): void;
}

// A human bidder just gets notified.
class HumanBidder extends Bidder {
  public onOutbid(leader: string, amount: number): void {
    console.log(`    ${this.name} sees ${leader} leading at Rs.${amount}`);
  }
}

// An auto-bidder reacts by bidding again — through the mediator, as always.
class AutoBidder extends Bidder {
  constructor(name: string, maxBudget: number, private readonly increment: number) {
    super(name, maxBudget);
  }

  public onOutbid(leader: string, amount: number): void {
    const next: number = amount + this.increment;
    if (next <= this.maxBudget) {
      console.log(`    ${this.name} auto-bids Rs.${next}`);
      this.bid(next);
    } else {
      console.log(`    ${this.name} is out (budget Rs.${this.maxBudget})`);
    }
  }
}

class AuctionHouse implements AuctionMediator {
  private readonly bidders: Bidder[] = [];
  private highest: number = 0;
  private leader?: Bidder;

  constructor(private readonly reservePrice: number) {}

  public join(bidder: Bidder): void {
    this.bidders.push(bidder);
    bidder.setMediator(this);
  }

  // Validation and broadcast: the rules of the auction live here.
  public placeBid(bidder: Bidder, amount: number): void {
    if (amount <= this.highest) {
      console.log(`  rejected: Rs.${amount} does not beat Rs.${this.highest}`);
      return;
    }
    if (amount > bidder.maxBudget) {
      console.log(`  rejected: ${bidder.name} cannot afford Rs.${amount}`);
      return;
    }

    this.highest = amount;
    this.leader = bidder;
    console.log(`  ${bidder.name} bids Rs.${amount}`);

    // Notify everyone else. They may bid back, which re-enters placeBid.
    this.bidders
      .filter((b: Bidder): boolean => b !== bidder)
      .forEach((b: Bidder): void => b.onOutbid(bidder.name, amount));
  }

  public close(): void {
    if (this.leader === undefined || this.highest < this.reservePrice) {
      console.log(`unsold (reserve Rs.${this.reservePrice}, highest Rs.${this.highest})`);
      return;
    }
    console.log(`sold to ${this.leader.name} for Rs.${this.highest}`);
  }
}

// ---- Demo ----

const house: AuctionHouse = new AuctionHouse(10_000);

const ada: HumanBidder = new HumanBidder("Ada", 50_000);
house.join(ada);
house.join(new AutoBidder("SniperBot", 18_000, 1_000));
house.join(new AutoBidder("BudgetBot", 13_000, 500));

console.log("opening bid:");
ada.bid(9_000);

console.log("\na bid that is too low:");
ada.bid(5_000);

console.log("");
house.close();
