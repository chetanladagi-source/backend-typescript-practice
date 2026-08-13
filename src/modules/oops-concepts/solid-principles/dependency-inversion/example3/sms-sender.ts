// SMS implementation of `MessageSender`, added without touching the service.

import { MessageSender } from "./message-sender";

export class SmsSender implements MessageSender {
  private readonly sent: string[] = [];

  public channel(): string {
    return "sms";
  }

  public send(recipient: string, body: string): void {
    const trimmed: string = body.length > 30 ? `${body.slice(0, 27)}...` : body;
    this.sent.push(recipient);
    console.log(`[sms] -> ${recipient}: ${trimmed}`);
  }

  public sentCount(): number {
    return this.sent.length;
  }
}
