// Prototype (generic) — Example 2: clone a latte recipe. Shallow copy shares the toppings array.

interface Shot {
  grams: number;
  seconds: number;
}

export class Recipe {
  constructor(
    public name: string,
    public size: string,
    public shot: Shot,
    public toppings: string[],
  ) {}

  public cloneShallow(): Recipe {
    return Object.assign(Object.create(Recipe.prototype) as Recipe, this);
  }

  public clone(): Recipe {
    return new Recipe(this.name, this.size, { ...this.shot }, [...this.toppings]);
  }

  public describe(): string {
    return `${this.size} ${this.name}  ${this.shot.grams}g/${this.shot.seconds}s  toppings=[${this.toppings.join(", ")}]`;
  }
}

// ---- Demo ----

const houseLatte: Recipe = new Recipe("latte", "medium", { grams: 18, seconds: 28 }, ["cinnamon"]);

console.log("--- deep clone ---");
const vanilla: Recipe = houseLatte.clone();
vanilla.name = "vanilla latte";
vanilla.shot.grams = 20;
vanilla.toppings.push("vanilla");
console.log("  custom :", vanilla.describe());
console.log("  house  :", houseLatte.describe());

console.log("\n--- shallow clone ---");
const caramel: Recipe = houseLatte.cloneShallow();
caramel.name = "caramel latte"; // primitive: fine
caramel.shot.seconds = 35; // NESTED: house mutates
caramel.toppings.push("caramel"); // ARRAY: house mutates
console.log("  custom :", caramel.describe());
console.log("  house  :", houseLatte.describe());
console.log("  shot shared?    ", caramel.shot === houseLatte.shot);
console.log("  toppings shared?", caramel.toppings === houseLatte.toppings);
