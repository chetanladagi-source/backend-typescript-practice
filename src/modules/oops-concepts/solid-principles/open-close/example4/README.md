# Example 4 - Notifications

Scenario: order updates go out by email and SMS, and push is added later.

Violation: `LegacyNotifier.send()` switches on a channel string. The push
requirement forces an edit inside the class every other feature already depends
on, and the switch keeps growing with each new transport.

Fix: `NotificationChannel` declares `deliver()`, each transport is its own class,
and `NotificationService` just loops over the channels it was given.

Takeaway: the service never learns what a "push" is - it is composed with new
channels from outside, so existing transports stay untouched.
