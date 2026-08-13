// Service that fans a message out over any set of channels.

import { NotificationChannel } from "./notification-channel";

export class NotificationService {
  public constructor(private readonly channels: NotificationChannel[]) {}

  public broadcast(to: string, message: string): void {
    for (const channel of this.channels) {
      channel.deliver(to, message);
    }
  }
}
