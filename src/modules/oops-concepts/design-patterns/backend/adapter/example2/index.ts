// Adapter — Example 2: three SMS vendors, three different APIs, one interface.
// This is the classic "we need a fallback provider" situation.

export interface SmsSender {
  send(phone: string, text: string): boolean;
}

// --- Adaptees: each vendor's real-world-ish shape ---

class TwilioClient {
  public messagesCreate(opts: { to: string; from: string; body: string }): { sid: string } {
    console.log(`[twilio] -> ${opts.to}: ${opts.body}`);
    return { sid: "SM123" };
  }
}

class MsgNineOneApi {
  // Returns "success" / "failure" as a plain string, takes a comma-joined recipient list.
  public sendSms(numbers: string, message: string): string {
    console.log(`[msg91] -> ${numbers}: ${message}`);
    return "success";
  }
}

class AwsSnsClient {
  public publish(params: { PhoneNumber: string; Message: string }): { MessageId: string } {
    console.log(`[sns] -> ${params.PhoneNumber}: ${params.Message}`);
    return { MessageId: "mid-999" };
  }
}

// --- Adapters ---

class TwilioAdapter implements SmsSender {
  constructor(private readonly client: TwilioClient = new TwilioClient()) {}

  public send(phone: string, text: string): boolean {
    const res = this.client.messagesCreate({ to: phone, from: "+15550001111", body: text });
    return res.sid !== "";
  }
}

class Msg91Adapter implements SmsSender {
  constructor(private readonly api: MsgNineOneApi = new MsgNineOneApi()) {}

  public send(phone: string, text: string): boolean {
    return this.api.sendSms(phone, text) === "success";
  }
}

class SnsAdapter implements SmsSender {
  constructor(private readonly client: AwsSnsClient = new AwsSnsClient()) {}

  public send(phone: string, text: string): boolean {
    return this.client.publish({ PhoneNumber: phone, Message: text }).MessageId !== "";
  }
}

// Because every vendor now looks the same, generic behaviour like failover is trivial.
function sendWithFailover(senders: SmsSender[], phone: string, text: string): void {
  for (const sender of senders) {
    if (sender.send(phone, text)) {
      console.log("delivered\n");
      return;
    }
    console.log("failed, trying next vendor");
  }
  console.log("all vendors failed\n");
}

// ---- Demo ----

sendWithFailover([new Msg91Adapter(), new TwilioAdapter()], "+919999999999", "Your OTP is 4821");
sendWithFailover([new SnsAdapter()], "+15551234567", "Your package is out for delivery");
