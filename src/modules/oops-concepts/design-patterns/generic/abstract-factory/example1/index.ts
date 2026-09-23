// Abstract Factory (generic) — Example 1: matched drink + cup pairs.

interface Drink {
  serve(): string;
}
interface Cup {
  describe(): string;
}

class HotCoffee implements Drink {
  public serve(): string {
    return "steaming espresso";
  }
}
class IcedCoffee implements Drink {
  public serve(): string {
    return "cold brew with ice";
  }
}

class PaperCupWithLid implements Cup {
  public describe(): string {
    return "paper cup with a heat-safe lid";
  }
}
class PlasticCupWithStraw implements Cup {
  public describe(): string {
    return "plastic cup with a straw";
  }
}

// The abstract factory: a family of related products.
export interface DrinkFactory {
  createDrink(): Drink;
  createCup(): Cup;
}

class HotDrinkFactory implements DrinkFactory {
  public createDrink(): Drink {
    return new HotCoffee();
  }
  public createCup(): Cup {
    return new PaperCupWithLid();
  }
}

class ColdDrinkFactory implements DrinkFactory {
  public createDrink(): Drink {
    return new IcedCoffee();
  }
  public createCup(): Cup {
    return new PlasticCupWithStraw();
  }
}

// The caller (a barista) does not know the concrete classes.
function prepareOrder(factory: DrinkFactory): string {
  const drink: Drink = factory.createDrink();
  const cup: Cup = factory.createCup();
  return `serving ${drink.serve()} in a ${cup.describe()}`;
}

// ---- Demo ----

console.log("hot order:  ", prepareOrder(new HotDrinkFactory()));
console.log("cold order: ", prepareOrder(new ColdDrinkFactory()));

// The pattern's guarantee: a factory picks a whole family, so a mismatch is IMPOSSIBLE.
// You cannot construct a HotDrinkFactory that returns a plastic cup — the shape of the class
// forbids it. Contrast this with two independent factories:
//   const drink = new HotCoffee();
//   const cup = new PlasticCupWithStraw(); // nothing stops the wrong pairing
