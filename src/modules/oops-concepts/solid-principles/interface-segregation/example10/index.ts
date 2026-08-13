// Runnable entry point contrasting the fat NotificationService with one contract per channel.

import { EmailOnlyServiceViolation, NotificationService } from "./notification-service-violation";
import { EmailSender } from "./email-sender";
import { NotificationChannel } from "./notification-channel";
import { PushSender } from "./push-sender";
import { SlackSender } from "./slack-sender";
import { SmsSender } from "./sms-sender";

console.log("=== Violation ===");
const fatService: NotificationService = new EmailOnlyServiceViolation();
fatService.sendEmail("ada@example.com", "build passed");
try {
  fatService.sendSms("+1-555-0100", "build passed");
} catch (error) {
  console.log("[violation] sendSms failed:", (error as Error).message);
}
fatService.sendPush("device-token-1", "build passed");
try {
  fatService.sendSlack("#alerts", "build passed");
} catch (error) {
  console.log("[violation] sendSlack failed:", (error as Error).message);
}

console.log("=== ISP applied ===");
const channels: NotificationChannel[] = [
  new EmailSender(),
  new SmsSender(),
  new PushSender(),
  new SlackSender()
];
const recipients: Record<string, string> = {
  email: "ada@example.com",
  sms: "+1-555-0100",
  push: "device-token-1",
  slack: "#alerts"
};
for (const channel of channels) {
  channel.send(recipients[channel.name] ?? "unknown", "build passed");
}

const emailOnly: NotificationChannel = new EmailSender();
emailOnly.send("grace@example.com", "deploy finished");
