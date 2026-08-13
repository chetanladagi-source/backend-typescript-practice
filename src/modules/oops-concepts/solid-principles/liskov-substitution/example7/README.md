# Example 7 - Stack extends Queue

**Scenario:** A ticket drainer relies on a `Queue` to hand back items in arrival order.

**Broken contract:** `Queue.take()` promises first-in-first-out removal. `Stack` reuses the same interface but pops the newest item, so ordering semantics are inverted. Nothing throws inside the collection; the caller just processes tickets in the wrong order, which is why the drainer has to assert the order itself.

**Fix:** Give each ordering its own abstraction, `Queue` with `enqueue`/`dequeue` and `Stack` with `push`/`pop`, implemented by `FifoQueue` and `LifoStack`. Consumers then declare the ordering they depend on.

**Takeaway:** Matching method signatures does not make a subtype. Behavioural semantics such as ordering are part of the contract, so conflicting semantics deserve separate abstractions.
