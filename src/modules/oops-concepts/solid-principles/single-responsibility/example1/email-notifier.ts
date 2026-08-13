// Only delivers notification messages.

export class EmailNotifier {
  private readonly outbox: string[] = [];

  public sendWelcome(email: string): void {
    this.outbox.push(email);
    console.log("[notifier] welcome email queued for", email);
  }

  public sentCount(): number {
    return this.outbox.length;
  }
}
