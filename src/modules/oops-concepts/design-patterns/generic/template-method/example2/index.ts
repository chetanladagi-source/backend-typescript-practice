// Template Method (generic) — Example 2: brew recipes share one sequence.

export abstract class BrewRecipe {
  public brew(): void {
    console.log(`\n${this.name()}`);
    this.heatWater();
    this.grind();
    this.extract();
    this.finish();
  }

  protected abstract name(): string;
  protected abstract grind(): void;
  protected abstract extract(): void;

  protected heatWater(): void {
    console.log("  heat water to recipe temperature");
  }

  // Hook: espresso overrides this to add milk; pour-over uses the default.
  protected finish(): void {
    console.log("  pour into cup");
  }
}

class EspressoRecipe extends BrewRecipe {
  protected name(): string {
    return "espresso";
  }
  protected grind(): void {
    console.log("  grind 18g fine");
  }
  protected extract(): void {
    console.log("  9-bar shot, 28 seconds");
  }
}

class LatteRecipe extends BrewRecipe {
  protected name(): string {
    return "latte";
  }
  protected grind(): void {
    console.log("  grind 18g fine");
  }
  protected extract(): void {
    console.log("  9-bar shot, 28 seconds");
  }
  protected override finish(): void {
    console.log("  steam 200ml milk and pour");
  }
}

class PourOverRecipe extends BrewRecipe {
  protected name(): string {
    return "pour-over";
  }
  protected grind(): void {
    console.log("  grind 15g medium");
  }
  protected extract(): void {
    console.log("  bloom 30s, then pour in circles");
  }
}

// ---- Demo ----

new EspressoRecipe().brew();
new LatteRecipe().brew();
new PourOverRecipe().brew();
