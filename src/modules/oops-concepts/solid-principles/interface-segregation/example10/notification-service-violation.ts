// Fat notification contract bundling every delivery channel.

export interface NotificationService {
  sendEmail(to: string, body: string): void;
  sendSms(phone: string, body: string): void;
  sendPush(deviceToken: string, body: string): void;
  sendSlack(channel: string, body: string): void;
}

// ISP violation: an email-only integration must implement three channels it has no credentials for.
export class EmailOnlyServiceViolation implements NotificationService {
  public sendEmail(to: string, body: string): void {
    console.log("[violation-email] mail to", to, ":", body);
  }

  public sendSms(phone: string, body: string): void {
    throw new Error(`No SMS provider configured, cannot text ${phone}: ${body}`);
  }

  public sendPush(deviceToken: string, body: string): void {
    console.log("[violation-email] sendPush(", deviceToken, ") is a silent no-op:", body);
  }

  public sendSlack(channel: string, body: string): void {
    throw new Error(`No Slack token configured, cannot post to ${channel}: ${body}`);
  }
}
