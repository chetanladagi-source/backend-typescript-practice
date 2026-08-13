// Violating design: one sender that switches on the delivery channel.

export class LegacyNotifier {
  // OCP violation: supporting a new channel means editing this switch.
  public send(channel: string, to: string, message: string): void {
    switch (channel) {
      case "email":
        console.log(`Email to ${to}: ${message}`);
        break;
      case "sms":
        console.log(`SMS to ${to}: ${message}`);
        break;
      default:
        console.log(`No transport configured for channel: ${channel}`);
        break;
    }
  }
}
