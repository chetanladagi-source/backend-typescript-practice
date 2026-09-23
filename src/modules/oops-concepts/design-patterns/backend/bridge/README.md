# Bridge (Structural)

**Intent:** split an abstraction from its implementation so the two can vary independently.

## The problem it solves: class explosion

You have 3 notification types and 3 delivery channels. With inheritance that is 9 classes:
`UrgentEmail`, `UrgentSms`, `UrgentPush`, `ReminderEmail`, ... Add a fourth channel and you write
three more. The hierarchy multiplies.

Bridge makes it **3 + 3 = 6**, joined by composition:

```
Abstraction (Notification)  ---has-a-->  Implementor (Channel)
   ├── UrgentNotification                   ├── EmailChannel
   └── ReminderNotification                 └── SmsChannel
```

Adding a channel is one class. Adding a notification type is one class. Nothing multiplies.

## How to spot it in an interview

Look for two independent reasons to subclass. If you can finish the sentence "we have N *kinds* of
X and M *ways* to Y", it is Bridge.

## Bridge vs Strategy

Structurally almost identical — both delegate to an interface. The difference is intent and scope:

- **Strategy** swaps one interchangeable algorithm, often per call, and the context usually has
  one job.
- **Bridge** is a structural decision made up front so two whole hierarchies can grow separately.
  The abstraction side is itself a hierarchy, which Strategy's context usually is not.

If an interviewer pushes, saying "same mechanism, different intent and scale" is the honest answer.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Notification types × delivery channels |
| `example2` | Report types × output renderers |
| `example3` | Payment kinds × gateways |

## Interview questions

- **Bridge vs Adapter?** Adapter is retrofitted onto code that already exists and does not fit.
  Bridge is designed in from the start to prevent the mismatch.
- **Bridge vs Abstract Factory?** Factory creates the objects; Bridge is how they are wired.
  They are often used together — a factory picks the implementor.
