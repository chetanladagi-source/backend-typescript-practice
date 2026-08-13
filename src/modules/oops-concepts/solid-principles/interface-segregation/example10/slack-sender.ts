// Owns the Slack channel only.

import { NotificationChannel } from "./notification-channel";

export class SlackSender implements NotificationChannel {
  public readonly name: string = "slack";

  public send(recipient: string, body: string): void {
    console.log("[slack] post in", recipient, ":", body);
  }
}
