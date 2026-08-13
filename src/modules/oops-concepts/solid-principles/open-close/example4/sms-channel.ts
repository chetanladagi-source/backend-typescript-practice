// SMS transport.

import { NotificationChannel } from "./notification-channel";

export class SmsChannel implements NotificationChannel {
  public readonly channel: string = "sms";

  public deliver(to: string, message: string): void {
    console.log(`[sms] to=${to} body="${message.slice(0, 60)}"`);
  }
}
