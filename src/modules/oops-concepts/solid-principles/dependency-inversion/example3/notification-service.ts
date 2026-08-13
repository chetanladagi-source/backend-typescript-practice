// High-level policy: decides what to say, never how it travels.

import { MessageSender } from "./message-sender";

export class NotificationService {
  constructor(private readonly sender: MessageSender) {}

  public notifyShipped(recipient: string, orderId: string): void {
    console.log(`[notifications] using ${this.sender.channel()}`);
    this.sender.send(recipient, `Order ${orderId} has shipped and arrives in two days.`);
  }
}
