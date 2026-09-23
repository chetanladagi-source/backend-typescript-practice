// Bridge — Example 1: notification types × delivery channels.
// Without Bridge this would be types × channels classes. With it, types + channels.

// --- Implementor side: HOW a message is delivered ---
export interface Channel {
  deliver(to: string, subject: string, body: string): void;
}

class EmailChannel implements Channel {
  public deliver(to: string, subject: string, body: string): void {
    console.log(`  [email] to=${to} | ${subject} | ${body}`);
  }
}

class SmsChannel implements Channel {
  public deliver(to: string, subject: string, body: string): void {
    // SMS has no subject line, so the channel decides how to fold it in.
    console.log(`  [sms] to=${to} | ${subject}: ${body.slice(0, 40)}`);
  }
}

class SlackChannel implements Channel {
  public deliver(to: string, subject: string, body: string): void {
    console.log(`  [slack] #${to} | *${subject}*\n    > ${body}`);
  }
}

// --- Abstraction side: WHAT is being said ---
export abstract class Notification {
  // The bridge: a reference, not a base class.
  constructor(protected readonly channel: Channel) {}

  public abstract send(to: string, context: string): void;
}

class UrgentAlert extends Notification {
  public send(to: string, context: string): void {
    this.channel.deliver(to, "[URGENT] Action required", `Immediate attention needed: ${context}`);
  }
}

class Reminder extends Notification {
  public send(to: string, context: string): void {
    this.channel.deliver(to, "Friendly reminder", `Just a nudge about ${context}.`);
  }
}

class Receipt extends Notification {
  public send(to: string, context: string): void {
    this.channel.deliver(to, "Your receipt", `Thanks for your payment. Reference: ${context}.`);
  }
}

// ---- Demo ----

// Any type can pair with any channel, chosen at runtime.
const combos: Notification[] = [
  new UrgentAlert(new SmsChannel()),
  new UrgentAlert(new SlackChannel()),
  new Reminder(new EmailChannel()),
  new Receipt(new EmailChannel()),
];

combos.forEach((n: Notification): void => n.send("ada@example.com", "invoice INV-2031"));

// Adding a channel is ONE class, and every existing notification type can use it immediately.
class WebhookChannel implements Channel {
  public deliver(to: string, subject: string, body: string): void {
    console.log(`  [webhook] POST ${to} ${JSON.stringify({ subject, body })}`);
  }
}

console.log("--- new channel, no changes to any notification type ---");
new UrgentAlert(new WebhookChannel()).send("https://hooks.example.com/x", "disk usage at 97%");
new Receipt(new WebhookChannel()).send("https://hooks.example.com/x", "pay_991");
