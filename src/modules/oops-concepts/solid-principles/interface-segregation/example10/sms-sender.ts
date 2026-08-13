// Owns the SMS channel only.

import { NotificationChannel } from "./notification-channel";

export class SmsSender implements NotificationChannel {
  public readonly name: string = "sms";

  public send(recipient: string, body: string): void {
    console.log("[sms] text to", recipient, ":", body);
  }
}
