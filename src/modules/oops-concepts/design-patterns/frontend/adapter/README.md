# Adapter — Frontend

Full theory, the Adapter/Decorator/Facade/Proxy table and interview questions:
[`../../backend/adapter/README.md`](../../backend/adapter/README.md)

## Where it shows up on the frontend

- **Anti-corruption layer for APIs.** Backend returns `{ user_full_name, is_act: 1 }`; your
  components want `{ fullName, isActive }`. Adapt once at the network boundary.
- Normalising two providers behind one interface: Google vs GitHub OAuth profiles, Stripe vs
  Razorpay checkout widgets, different map SDKs.
- Wrapping `localStorage` / `sessionStorage` / in-memory / cookies behind one storage interface.
- Making a third-party jQuery-era widget usable from React.

## The frontend-specific note

This is the highest-value pattern for day-to-day frontend work. Without an adapter, backend field
names leak into every component, and the day the API renames a field you are editing 40 files. With
one, you edit the adapter.

The adapter is also where you handle **the API's bad habits**: nulls that should be empty arrays,
numeric booleans, dates as strings, inconsistent casing. Components should never see any of that.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Two API versions normalised into one view model |
| `example2` | localStorage, sessionStorage and memory behind one storage interface |
