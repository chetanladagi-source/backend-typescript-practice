// Builder — Example 3: email messages, plus a Director.
// The Director captures reusable "recipes" so common emails are one call, not ten.

export interface Email {
  readonly to: string[];
  readonly cc: string[];
  readonly subject: string;
  readonly body: string;
  readonly attachments: string[];
  readonly priority: "low" | "normal" | "high";
}

class EmailBuilder {
  private to: string[] = [];
  private cc: string[] = [];
  private subject: string = "(no subject)";
  private body: string = "";
  private attachments: string[] = [];
  private priority: Email["priority"] = "normal";

  public addTo(address: string): this {
    this.to.push(address);
    return this;
  }

  public addCc(address: string): this {
    this.cc.push(address);
    return this;
  }

  public withSubject(subject: string): this {
    this.subject = subject;
    return this;
  }

  public withBody(body: string): this {
    this.body = body;
    return this;
  }

  public attach(fileName: string): this {
    this.attachments.push(fileName);
    return this;
  }

  public withPriority(priority: Email["priority"]): this {
    this.priority = priority;
    return this;
  }

  public build(): Email {
    if (this.to.length === 0) {
      throw new Error("an email needs at least one recipient");
    }
    return {
      to: [...this.to],
      cc: [...this.cc],
      subject: this.subject,
      body: this.body,
      attachments: [...this.attachments],
      priority: this.priority,
    };
  }
}

// The Director knows the recipes. Callers ask for an outcome, not a sequence of steps.
class EmailDirector {
  public static welcome(address: string, name: string): Email {
    return new EmailBuilder()
      .addTo(address)
      .withSubject(`Welcome aboard, ${name}!`)
      .withBody("Thanks for signing up. Here is how to get started...")
      .build();
  }

  public static invoice(address: string, invoiceId: string): Email {
    return new EmailBuilder()
      .addTo(address)
      .addCc("billing@example.com")
      .withSubject(`Invoice ${invoiceId}`)
      .withBody("Your invoice is attached.")
      .attach(`${invoiceId}.pdf`)
      .withPriority("high")
      .build();
  }
}

// ---- Demo ----

console.log(EmailDirector.welcome("ada@example.com", "Ada"));
console.log(EmailDirector.invoice("grace@example.com", "INV-2031"));

// The builder is still available directly for one-off emails the Director does not cover.
const adHoc: Email = new EmailBuilder()
  .addTo("ops@example.com")
  .withSubject("Deploy finished")
  .withBody("v2.4.0 is live.")
  .withPriority("low")
  .build();

console.log(adHoc);
