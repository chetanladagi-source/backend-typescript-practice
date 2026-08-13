# Example 7 — Member vs admin actions

**Scenario:** A single `UserActions` interface mixes everyday member operations with
moderation powers, so every account object advertises `banUser` and `deleteAccount`.

**Dead weight:** `banUser` and `deleteAccount` on `MemberAccountViolation`, which throw
authorisation errors — permissions enforced at runtime instead of by the type.

**Fix:** Split into `MemberActions` and `AdminActions`. `MemberAccount` implements only the first;
`AdminAccount` implements both.

**Takeaway:** When privileges live in separate interfaces, handing a member object to code that
expects `AdminActions` fails to compile — the safest place for that failure.
