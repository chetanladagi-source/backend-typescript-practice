// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyNotifier } from "./notification-violation";
import { NotificationChannel } from "./notification-channel";
import { EmailChannel } from "./email-channel";
import { SmsChannel } from "./sms-channel";
import { PushChannel } from "./push-channel";
import { NotificationService } from "./notification-service";

const message: string = "Your order has been shipped";

console.log("=== Violation ===");
const legacy: LegacyNotifier = new LegacyNotifier();
legacy.send("email", "chetan@example.com", message);
legacy.send("sms", "+919999900000", message);
legacy.send("push", "device-1", message);

console.log("\n=== OCP applied ===");
const channels: NotificationChannel[] = [new EmailChannel(), new SmsChannel()];
const service: NotificationService = new NotificationService(channels);
service.broadcast("user-42", message);

console.log("\n=== Extension without modification ===");
const extended: NotificationService = new NotificationService([...channels, new PushChannel()]);
extended.broadcast("user-42", message);
