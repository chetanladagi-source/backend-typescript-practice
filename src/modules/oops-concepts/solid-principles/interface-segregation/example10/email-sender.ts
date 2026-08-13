// Owns the email channel only.

import { NotificationChannel } from "./notification-channel";

export class EmailSender implements NotificationChannel {
  public readonly name: string = "email";

  public send(recipient: string, body: string): void {
    console.log("[email] mail to", recipient, ":", body);
  }
}
