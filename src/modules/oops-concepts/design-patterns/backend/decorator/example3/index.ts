// Decorator — Example 3: compression and encryption around a writer.
// This is the original GoF stream example, which is also how Node streams work.

export interface DataWriter {
  write(data: string): void;
  contents(): string;
}

// The terminal writer: actually stores the bytes.
class FileWriter implements DataWriter {
  private buffer: string = "";

  public write(data: string): void {
    console.log(`  [disk] writing ${data.length} chars`);
    this.buffer = data;
  }

  public contents(): string {
    return this.buffer;
  }
}

abstract class WriterDecorator implements DataWriter {
  constructor(protected readonly inner: DataWriter) {}

  public abstract write(data: string): void;

  public contents(): string {
    return this.inner.contents();
  }
}

class CompressingWriter extends WriterDecorator {
  public write(data: string): void {
    // Fake run-length compression so the effect is visible in the output.
    const compressed: string = data.replace(/(.)\1+/g, (run: string, ch: string): string => `${ch}${run.length}`);
    console.log(`  [gzip] ${data.length} -> ${compressed.length} chars`);
    this.inner.write(compressed);
  }
}

class EncryptingWriter extends WriterDecorator {
  public write(data: string): void {
    const encrypted: string = Buffer.from(data).toString("base64");
    console.log(`  [aes] encrypted to ${encrypted.length} chars`);
    this.inner.write(encrypted);
  }
}

// ---- Demo ----

const payload: string = "aaaaabbbbbcccccddddd-secret-report";

// The OUTERMOST decorator runs first, so read the nesting left to right.
console.log("compress, then encrypt (good):");
const secure: DataWriter = new CompressingWriter(new EncryptingWriter(new FileWriter()));
secure.write(payload);
console.log("  stored:", secure.contents());

console.log("encrypt, then compress (wasteful):");
const wasteful: DataWriter = new EncryptingWriter(new CompressingWriter(new FileWriter()));
wasteful.write(payload);
console.log("  stored:", wasteful.contents());
