# Bridge — Frontend

Full theory, the class-explosion maths and the Bridge/Strategy distinction:
[`../../backend/bridge/README.md`](../../backend/bridge/README.md)

## Where it shows up on the frontend

- **Headless UI libraries.** Radix, Headless UI, and TanStack Table are Bridge at library scale:
  behaviour (the abstraction) is separated from presentation (the implementation), so one
  `useSelect` powers any visual design.
- Notification *kinds* (error, confirmation, promo) × *surfaces* (toast, modal, banner, inline).
- One component API rendering to web, React Native, or canvas.

## How to spot it

Two independent axes of variation. If you are about to write `ErrorToast`, `ErrorModal`,
`ErrorBanner`, `PromoToast`, `PromoModal`... stop — that is kinds × surfaces, and it multiplies.
Bridge turns N × M classes into N + M.

## The frontend-specific note

"Headless components" is the modern name for this idea, and naming that connection is a strong
interview answer: `useCombobox()` gives you keyboard handling, focus management, and ARIA wiring,
while *you* supply the markup. Behaviour and presentation vary independently.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Notification kinds × display surfaces |
| `example2` | A headless select: one behaviour, three presentations |
