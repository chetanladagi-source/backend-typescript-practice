// Bad design: the notification policy can only ever speak SMTP.

class SmtpClient {
  public deliver(recipient: string, body: string): void {
    console.log(`[smtp:mail.internal] MAIL TO <${recipient}>`);
    console.log(`[smtp:mail.internal] DATA ${body}`);
  }
}

export class NotificationServiceViolation {
  // VIOLATION: the transport is chosen by the high-level class itself, so supporting SMS
  // or push means editing this file instead of adding one.
  private readonly smtp: SmtpClient = new SmtpClient();

  public notifyShipped(recipient: string, orderId: string): void {
    console.log("[notifications] using email");
    this.smtp.deliver(recipient, `Order ${orderId} has shipped and arrives in two days.`);
  }
}
