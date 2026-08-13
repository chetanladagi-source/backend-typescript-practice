// Email implementation of `MessageSender`; the SMTP dialogue is simulated.

import { MessageSender } from "./message-sender";

export class SmtpEmailSender implements MessageSender {
  constructor(private readonly host: string) {}

  public channel(): string {
    return "email";
  }

  public send(recipient: string, body: string): void {
    console.log(`[smtp:${this.host}] MAIL TO <${recipient}>`);
    console.log(`[smtp:${this.host}] DATA ${body}`);
  }
}
