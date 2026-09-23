// Factory Method (frontend) — Example 2: toast notifications.
// toast.success(...) is a factory method you have almost certainly called.

export interface Toast {
  readonly severity: string;
  readonly icon: string;
  readonly timeoutMs: number | null; // null = must be dismissed manually
  readonly ariaLive: "polite" | "assertive";
  render(message: string): string;
}

abstract class BaseToast implements Toast {
  public abstract readonly severity: string;
  public abstract readonly icon: string;
  public abstract readonly timeoutMs: number | null;
  public abstract readonly ariaLive: "polite" | "assertive";

  public render(message: string): string {
    const dismiss: string = this.timeoutMs === null ? "manual" : `${this.timeoutMs}ms`;
    return `<div role="status" aria-live="${this.ariaLive}" class="toast toast--${this.severity}">${this.icon} ${message} <small>(${dismiss})</small></div>`;
  }
}

class SuccessToast extends BaseToast {
  public readonly severity: string = "success";
  public readonly icon: string = "\u2713";
  public readonly timeoutMs: number | null = 3000;
  public readonly ariaLive: "polite" | "assertive" = "polite";
}

class InfoToast extends BaseToast {
  public readonly severity: string = "info";
  public readonly icon: string = "\u2139";
  public readonly timeoutMs: number | null = 5000;
  public readonly ariaLive: "polite" | "assertive" = "polite";
}

class ErrorToast extends BaseToast {
  public readonly severity: string = "error";
  public readonly icon: string = "\u2717";
  // Errors must not vanish before the user reads them.
  public readonly timeoutMs: number | null = null;
  public readonly ariaLive: "polite" | "assertive" = "assertive";
}

type Severity = "success" | "info" | "error";

function createToast(severity: Severity): Toast {
  switch (severity) {
    case "success":
      return new SuccessToast();
    case "info":
      return new InfoToast();
    case "error":
      return new ErrorToast();
  }
}

// The friendly API most toast libraries expose, built on the factory.
export const toast = {
  success: (message: string): string => createToast("success").render(message),
  info: (message: string): string => createToast("info").render(message),
  error: (message: string): string => createToast("error").render(message),
};

// ---- Demo ----

console.log(toast.success("Profile saved"));
console.log(toast.info("A new version is available"));
console.log(toast.error("Could not reach the server"));

// Generic code can work off the interface without knowing the severities.
console.log("\n--- a queue that auto-dismisses only what is dismissable ---");
const queued: Toast[] = (["success", "error", "info"] as Severity[]).map(createToast);
queued.forEach((t: Toast): void => {
  console.log(
    t.timeoutMs === null
      ? `  ${t.severity}: stays until dismissed (aria-live=${t.ariaLive})`
      : `  ${t.severity}: auto-dismiss after ${t.timeoutMs}ms`,
  );
});
