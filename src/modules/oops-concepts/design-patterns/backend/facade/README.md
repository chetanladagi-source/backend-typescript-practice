# Facade (Structural)

**Intent:** provide one simple, high-level interface over a complicated subsystem.

The client says `placeOrder(...)` instead of orchestrating inventory, payment, shipping,
invoicing, and notifications by hand.

## When to use

- A workflow always calls the same five services in the same order, and that sequence is currently
  copy-pasted into controllers.
- You want a clean seam between layers: controllers talk to facades, facades talk to services.
- You are wrapping a legacy or third-party subsystem and want the ugly parts in one file.

## What it is not

- **Not an Adapter.** Adapter makes one incompatible interface fit an expected one. Facade invents
  a *new, simpler* interface over many classes.
- **Not a rule that you must go through it.** The subsystem stays public. Advanced callers can
  still reach past the facade for the unusual case. A facade that hides everything becomes a
  bottleneck.

## The failure mode

A facade that keeps absorbing responsibility becomes a God Object. When `OrderFacade` is 800
lines, split it or push logic back down into the services.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | `placeOrder` over inventory, payment, shipping, and notifications |
| `example2` | Media upload: validate, transcode, thumbnail, CDN |
| `example3` | User onboarding: hash, persist, token, audit, welcome email |

## Interview questions

- **Facade vs Mediator?** Facade is one-directional: clients → subsystem, and the subsystem does
  not know the facade exists. Mediator is bidirectional: components talk *through* it and know
  about it.
- **Facade vs Abstract Factory?** Factory creates objects; Facade coordinates behaviour.
- **Is a service layer a facade?** Often, yes. Most `OrderService` classes are facades over
  repositories and clients.
