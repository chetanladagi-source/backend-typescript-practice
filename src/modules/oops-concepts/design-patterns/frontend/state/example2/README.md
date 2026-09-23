# Example 2 — Media player, one class per state

**Problem:** `play()` written as a single method turns into `if (stopped) {...} else if (paused)
{...} else if (playing) {...}`, and so does `pause()`, and `stop()`, and `enabledControls()`. Add a
"buffering" state and you edit every one of them.

**Pattern:** `Stopped`, `Playing` and `Paused` each implement `PlayerState`. `Player` forwards
every call to the current state object and holds no branching at all. Adding "buffering" is one new
class plus the transitions that lead into it.

**What the demo is showing:**

- **Play means different things.** From stopped it restarts at 0; from paused it resumes at 42s.
  Same button, same method name, different state object.
- **Invalid actions are absorbed, not crashed.** Pausing while stopped logs and does nothing,
  because `StoppedState.pause()` is the no-op. No guard clauses in the player.
- **The toolbar comes from the state too.** `enabledControls()` means disabled-button logic lives
  next to the behaviour it guards, instead of in a separate render-time condition that can
  disagree with it.

**State versus Strategy, the question you will get:** the objects look identical. The difference is
who chooses. A strategy is injected by the caller and does not change itself; a state swaps *itself*
for the next state (`this.player.setState(new PlayingState(...))`). States know the transition
graph; strategies do not know each other exists.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/state/example2/index.ts`
