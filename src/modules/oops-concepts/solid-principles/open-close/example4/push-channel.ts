// New transport added later without touching any existing file.

import { NotificationChannel } from "./notification-channel";

export class PushChannel implements NotificationChannel {
  public readonly channel: string = "push";

  public deliver(to: string, message: string): void {
    console.log(`[push] device=${to} alert="${message}"`);
  }
}
