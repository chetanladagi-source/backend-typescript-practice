// Observer — Example 3: upload progress.
// Shows observers with a lifetime: some detach themselves once they are done.

export interface ProgressEvent {
  fileName: string;
  percent: number;
}

type Listener = (event: ProgressEvent) => void;

class UploadJob {
  private readonly listeners: Set<Listener> = new Set<Listener>();

  constructor(private readonly fileName: string) {}

  public onProgress(listener: Listener): () => void {
    this.listeners.add(listener);
    return (): void => {
      this.listeners.delete(listener);
    };
  }

  public run(): void {
    [0, 25, 50, 75, 100].forEach((percent: number): void => {
      const event: ProgressEvent = { fileName: this.fileName, percent };
      // A Set copy, again because listeners may remove themselves mid-notification.
      [...this.listeners].forEach((listener: Listener): void => listener(event));
    });
  }

  public listenerCount(): number {
    return this.listeners.size;
  }
}

// ---- Demo ----

const job: UploadJob = new UploadJob("lecture.mp4");

// A plain progress bar, listening for the whole upload.
job.onProgress((e: ProgressEvent): void => {
  const filled: string = "#".repeat(e.percent / 5).padEnd(20, ".");
  console.log(`  [${filled}] ${e.percent}%`);
});

// A one-shot listener: fires at the halfway mark, then unsubscribes itself.
const stopHalfway: () => void = job.onProgress((e: ProgressEvent): void => {
  if (e.percent >= 50) {
    console.log("  [halfway] upload passed 50%, detaching this listener");
    stopHalfway();
  }
});

// A completion listener that also cleans itself up.
const stopDone: () => void = job.onProgress((e: ProgressEvent): void => {
  if (e.percent === 100) {
    console.log(`  [done] ${e.fileName} uploaded, notifying the user`);
    stopDone();
  }
});

console.log("listeners before:", job.listenerCount());
job.run();
console.log("listeners after:", job.listenerCount()); // only the progress bar remains
