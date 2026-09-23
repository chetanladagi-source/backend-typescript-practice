// Command — Example 2: a background job queue.
// Because work is an object, it can be stored, retried and reported on.

export interface Job {
  readonly name: string;
  readonly maxAttempts: number;
  run(): void;
}

class SendEmailJob implements Job {
  public readonly name: string;
  public readonly maxAttempts: number = 3;

  constructor(private readonly to: string, private readonly subject: string) {
    this.name = `send-email(${to})`;
  }

  public run(): void {
    console.log(`    emailed ${this.to}: "${this.subject}"`);
  }
}

class GenerateInvoiceJob implements Job {
  public readonly name: string;
  public readonly maxAttempts: number = 5;
  private attempts: number = 0;

  constructor(private readonly orderId: string) {
    this.name = `generate-invoice(${orderId})`;
  }

  public run(): void {
    this.attempts++;
    if (this.attempts < 3) {
      throw new Error("PDF service timeout");
    }
    console.log(`    invoice for ${this.orderId} written to storage`);
  }
}

class ResizeImageJob implements Job {
  public readonly name: string = "resize-image(avatar.png)";
  public readonly maxAttempts: number = 2;

  public run(): void {
    throw new Error("unsupported colour profile");
  }
}

// Invoker: generic. It has no idea what any job does.
class JobQueue {
  private readonly pending: Job[] = [];
  private readonly failed: Job[] = [];

  public enqueue(job: Job): void {
    this.pending.push(job);
    console.log(`  queued ${job.name}`);
  }

  public drain(): void {
    let job: Job | undefined;
    while ((job = this.pending.shift()) !== undefined) {
      this.attempt(job);
    }
  }

  private attempt(job: Job): void {
    for (let i = 1; i <= job.maxAttempts; i++) {
      try {
        job.run();
        console.log(`  ok: ${job.name} (attempt ${i})`);
        return;
      } catch (err) {
        console.log(`  retry: ${job.name} attempt ${i} -> ${(err as Error).message}`);
      }
    }
    this.failed.push(job);
    console.log(`  dead-letter: ${job.name}`);
  }

  public deadLetters(): string[] {
    return this.failed.map((j: Job): string => j.name);
  }
}

// ---- Demo ----

const queue: JobQueue = new JobQueue();

queue.enqueue(new SendEmailJob("ada@example.com", "Welcome"));
queue.enqueue(new GenerateInvoiceJob("ORD-1"));
queue.enqueue(new ResizeImageJob());

console.log("--- draining ---");
queue.drain();

console.log("dead letter queue:", queue.deadLetters());
