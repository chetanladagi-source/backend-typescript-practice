# Example 3 - ReadOnlyList extends MutableList

**Scenario:** A tagging helper receives a `MutableList` and appends tags to it.

**Broken contract:** `MutableList.add()` guarantees that after the call the item is stored and `size()` has grown. `ReadOnlyList` inherits that signature but throws, so `appendTags` blows up for a subtype the type system happily accepted.

**Fix:** Split the contract into `ReadableList` (size, toArray) and `WritableList` (adds `add`). `ArrayList` implements the writable side, `FrozenList` only the readable side, and each consumer asks for the side it actually needs.

**Takeaway:** Read-only is not a special case of mutable, it is a smaller contract. Segregate mutation into its own interface so unsupported operations become compile-time errors rather than runtime exceptions.
