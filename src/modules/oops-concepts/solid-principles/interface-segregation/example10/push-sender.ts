// Owns the push channel only.

import { NotificationChannel } from "./notification-channel";

export class PushSender implements NotificationChannel {
  public readonly name: string = "push";

  public send(recipient: string, body: string): void {
    console.log("[push] device", recipient, ":", body);
  }
}
