# Mediator (Behavioral)

**Intent:** define an object that encapsulates how a set of objects interact, so they stop
referring to each other directly.

## The problem: N² coupling

Five services that each call the other four means twenty connections and a change ripples
everywhere. Route everything through a mediator and you have five connections — each component
knows only the mediator.

```
Before:  A <-> B <-> C, A <-> C, B <-> D ...   (a web)
After:   A -> M <- B,  C -> M <- D             (a star)
```

## When to use

- Components are tangled in mutual references.
- The interaction *rules* are the complex part and deserve to live somewhere nameable.
- You want components reusable in isolation — a component that only knows the mediator interface
  can be dropped into a different system.

## The risk

The mediator absorbs all the logic and becomes a God Object. That is the standard criticism: you
have not removed complexity, you have relocated it. The trade is worthwhile when the interactions
genuinely are the domain (a chat room, an auction, a workflow); it is not when you are just hiding
a tangle you should have untangled.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Chat room routing messages between users |
| `example2` | Order workflow coordinating inventory, payment, and shipping |
| `example3` | Auction house managing bidders |

## Interview questions

- **Mediator vs Observer?** Often used together. Observer is one-to-many broadcast and the subject
  does not care who listens. Mediator is many-to-many *coordination* with routing logic and
  decisions inside it. A mediator often uses observers internally.
- **Mediator vs Facade?** Facade is one-directional (clients call in, the subsystem does not know
  the facade exists). Mediator is bidirectional — components hold a reference to it and call it.
- **Real examples?** Chat servers, air traffic control (the textbook one), Redux stores, workflow
  engines, and message brokers at the infrastructure level.
