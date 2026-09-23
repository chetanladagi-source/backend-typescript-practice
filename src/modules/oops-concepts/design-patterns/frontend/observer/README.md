# Observer — Frontend

Full theory, the leak/error traps and interview questions:
[`../../backend/observer/README.md`](../../backend/observer/README.md)

## Where it shows up on the frontend

- **Every state manager.** Redux, Zustand, Jotai, MobX, Vue's reactivity — all publish changes to
  subscribed components.
- `addEventListener`, `IntersectionObserver`, `ResizeObserver`, `MutationObserver` (the browser
  literally names them after the pattern).
- RxJS, and React's `useSyncExternalStore`, which exists specifically to subscribe a component to
  an external observable store.

## The frontend-specific traps

- **Unsubscribe on unmount.** This is what the `useEffect` cleanup function is *for*. Forget it and
  you leak a listener per mount, and after a few navigations you have dozens of dead subscribers
  updating unmounted components.
- **Notify only what changed.** A store that re-renders every subscriber on any change is correct
  but slow. Selectors (`useStore(s => s.user.name)`) exist to narrow the subscription — example 1
  implements this.
- **Stale closures.** A listener registered once captures the props and state from that render.
  This is the most common React Observer bug.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A Zustand-style store with selector-based subscriptions |
| `example2` | A typed event bus, with unsubscribe-on-unmount modelled |
