// Email transport.

import { NotificationChannel } from "./notification-channel";

export class EmailChannel implements NotificationChannel {
  public readonly channel: string = "email";

  public deliver(to: string, message: string): void {
    console.log(`[email] to=${to} body="${message}"`);
  }
}
