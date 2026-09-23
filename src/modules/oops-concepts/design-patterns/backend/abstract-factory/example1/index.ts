// Abstract Factory — Example 1: a cloud "kit".
// Storage and queue must come from the same provider; the factory enforces that.

export interface Storage {
  upload(key: string, bytes: number): string;
}

export interface Queue {
  publish(topic: string, message: string): string;
}

// --- AWS family ---

class S3Storage implements Storage {
  public upload(key: string, bytes: number): string {
    return `[s3] PUT s3://bucket/${key} (${bytes} bytes)`;
  }
}

class SqsQueue implements Queue {
  public publish(topic: string, message: string): string {
    return `[sqs] sent to queue ${topic}: ${message}`;
  }
}

// --- GCP family ---

class GcsStorage implements Storage {
  public upload(key: string, bytes: number): string {
    return `[gcs] insert gs://bucket/${key} (${bytes} bytes)`;
  }
}

class PubSubQueue implements Queue {
  public publish(topic: string, message: string): string {
    return `[pubsub] published to ${topic}: ${message}`;
  }
}

// The abstract factory: one creator method per product type.
export interface CloudFactory {
  createStorage(): Storage;
  createQueue(): Queue;
}

class AwsFactory implements CloudFactory {
  public createStorage(): Storage {
    return new S3Storage();
  }
  public createQueue(): Queue {
    return new SqsQueue();
  }
}

class GcpFactory implements CloudFactory {
  public createStorage(): Storage {
    return new GcsStorage();
  }
  public createQueue(): Queue {
    return new PubSubQueue();
  }
}

// Application code sees only the interfaces. It cannot mix providers even by accident.
function processUpload(factory: CloudFactory, fileName: string): void {
  const storage: Storage = factory.createStorage();
  const queue: Queue = factory.createQueue();
  console.log(storage.upload(fileName, 2048));
  console.log(queue.publish("file-uploaded", fileName));
}

// ---- Demo ----

const provider: string = process.env.CLOUD_PROVIDER ?? "aws";
const factory: CloudFactory = provider === "gcp" ? new GcpFactory() : new AwsFactory();

console.log(`--- running on ${provider} ---`);
processUpload(factory, "invoices/2031.pdf");

console.log("--- same code, other provider ---");
processUpload(new GcpFactory(), "invoices/2031.pdf");
