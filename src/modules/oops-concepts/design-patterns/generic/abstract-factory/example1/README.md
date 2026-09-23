# Example 1 — Matched drink and cup pairs

**Problem:** a hot drink needs a paper cup with a lid; a cold drink needs a plastic cup with a
straw. Nothing at the language level stops a barista from putting iced coffee in a cup with a lid,
and one mismatched pair is the mistake the pattern exists to prevent.

**Pattern:** `DrinkFactory` declares `createDrink()` and `createCup()`. `HotDrinkFactory` and
`ColdDrinkFactory` each implement both methods for their family. Choosing a factory chooses a
matched pair — you cannot pick and mix.

**Abstract Factory vs Factory Method:** Factory Method produces *one* thing (an `Employee`).
Abstract Factory produces a *family* of related things (`Drink` + `Cup`) and enforces that they go
together. If you find yourself with two separate factories that always have to be used in matching
pairs, that is the smell that says merge them into one abstract factory.

**The value shows up as a NON-event:** the demo cannot produce a mismatched pair no matter what the
caller does. `prepareOrder(new HotDrinkFactory())` picks a whole family; there is no method on
`HotDrinkFactory` that could return a plastic cup. Contrast with two independent factories where
`new HotCoffee()` and `new PlasticCupWithStraw()` type-check fine.

**Cost to volunteer:** adding a new product to the family (say, `Napkin`) means editing every
factory. That is why the pattern earns its keep only when the family membership is truly stable —
here it is, because "a drink comes with a cup" will not change.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/abstract-factory/example1/index.ts`
