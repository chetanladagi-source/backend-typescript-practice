// Runnable entry point contrasting the SMTP-bound service with the injected one.

import { NotificationService } from "./notification-service";
import { NotificationServiceViolation } from "./notification-service-violation";
import { SmsSender } from "./sms-sender";
import { SmtpEmailSender } from "./smtp-email-sender";

console.log("=== Violation ===");
const hardWired: NotificationServiceViolation = new NotificationServiceViolation();
hardWired.notifyShipped("ada@example.com", "ord-1");

console.log("=== DIP applied ===");
const byEmail: NotificationService = new NotificationService(new SmtpEmailSender("mail.internal"));
byEmail.notifyShipped("ada@example.com", "ord-1");

const sms: SmsSender = new SmsSender();
const bySms: NotificationService = new NotificationService(sms);
bySms.notifyShipped("+15550100", "ord-2");
console.log("[test] sms delivered:", sms.sentCount());
