// Factory Method — Example 1: pick a notification channel at runtime.
// The caller says "send this by sms" and never imports SmsNotifier.

export interface Notifier {
  send(to: string, message: string): void;
}

class EmailNotifier implements Notifier {
  public send(to: string, message: string): void {
    console.log(`[email] to=${to} subject="Notification" body="${message}"`);
  }
}

class SmsNotifier implements Notifier {
  public send(to: string, message: string): void {
    console.log(`[sms] to=${to} text="${message.slice(0, 20)}..."`);
  }
}

class PushNotifier implements Notifier {
  public send(to: string, message: string): void {
    console.log(`[push] device=${to} payload=${JSON.stringify({ message })}`);
  }
}

type Channel = "email" | "sms" | "push";

// The factory method: the one place in the codebase that knows the concrete classes.
class NotifierFactory {
  public static create(channel: Channel): Notifier {
    switch (channel) {
      case "email":
        return new EmailNotifier();
      case "sms":
        return new SmsNotifier();
      case "push":
        return new PushNotifier();
    }
  }
}

// Business logic depends on `Notifier`, so it never changes when a channel is added.
function notifyUser(channel: Channel, to: string, message: string): void {
  const notifier: Notifier = NotifierFactory.create(channel);
  notifier.send(to, message);
}

// ---- Demo ----

notifyUser("email", "ada@example.com", "Your order has shipped");
notifyUser("sms", "+919999999999", "Your OTP is 4821, valid for 5 minutes");
notifyUser("push", "device-77", "You have 3 new messages");

// Typical real use: the channel comes from the user's saved preference.
const preference: Channel = "email";
notifyUser(preference, "grace@example.com", "Weekly summary is ready");
