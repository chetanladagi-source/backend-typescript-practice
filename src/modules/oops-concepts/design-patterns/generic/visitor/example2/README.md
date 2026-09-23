# Example 2 — Coffee menu visitors

**Problem:** the same cart needs a price, a calorie total and an allergen list. Putting
`price()`, `kcal()`, `allergens()` on every item type means every new report edits every class.

**Pattern:** `DrinkItem`, `FoodItem` and `ComboItem` only `accept`. Price, calories and allergies
are three visitors. Combos recurse via `accept` on their parts.

**Same double dispatch as the employee reports.** Adding a vegan-filter visitor touches no item
class. Adding a `TeaItem` would edit every visitor — that trade is unchanged.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/visitor/example2/index.ts`
