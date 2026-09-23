// Bridge (frontend) — Example 1: notification kinds × display surfaces.
// 4 kinds x 4 surfaces would be 16 components. Here it is 4 + 4.

// --- Implementor: WHERE the message appears ---
export interface Surface {
  present(title: string, body: string, actions: string[]): string;
}

class ToastSurface implements Surface {
  public present(title: string, body: string, actions: string[]): string {
    const buttons: string = actions.map((a: string): string => `<button>${a}</button>`).join("");
    return `<div class="toast" role="status"><strong>${title}</strong> ${body} ${buttons}</div>`;
  }
}

class ModalSurface implements Surface {
  public present(title: string, body: string, actions: string[]): string {
    const buttons: string = actions.map((a: string): string => `<button>${a}</button>`).join("");
    return `<dialog open aria-modal="true"><h2>${title}</h2><p>${body}</p><footer>${buttons}</footer></dialog>`;
  }
}

class BannerSurface implements Surface {
  public present(title: string, body: string, actions: string[]): string {
    const links: string = actions.map((a: string): string => `<a href="#">${a}</a>`).join(" · ");
    return `<div class="banner" role="region"><b>${title}</b> — ${body} ${links}</div>`;
  }
}

class InlineSurface implements Surface {
  public present(title: string, body: string): string {
    // Inline messages sit next to a field, so they never show action buttons.
    return `<p class="field-message"><b>${title}</b> ${body}</p>`;
  }
}

// --- Abstraction: WHAT is being communicated ---
export abstract class Notification {
  constructor(protected readonly surface: Surface) {}

  public abstract show(context: string): string;
}

class ValidationError extends Notification {
  public show(context: string): string {
    return this.surface.present("Check this field", `${context} is not valid.`, ["Dismiss"]);
  }
}

class DestructiveConfirm extends Notification {
  public show(context: string): string {
    return this.surface.present("Are you sure?", `This will permanently delete ${context}.`, ["Cancel", "Delete"]);
  }
}

class UpgradePrompt extends Notification {
  public show(context: string): string {
    return this.surface.present("Upgrade to Pro", `${context} is available on the Pro plan.`, ["Not now", "See plans"]);
  }
}

class SaveSuccess extends Notification {
  public show(context: string): string {
    return this.surface.present("Saved", `${context} was updated.`, []);
  }
}

// ---- Demo ----

// Any kind can appear on any surface; the product decides at the call site.
const combinations: [string, Notification][] = [
  ["validation inline", new ValidationError(new InlineSurface())],
  ["validation toast", new ValidationError(new ToastSurface())],
  ["delete confirm modal", new DestructiveConfirm(new ModalSurface())],
  ["upgrade banner", new UpgradePrompt(new BannerSurface())],
  ["upgrade modal", new UpgradePrompt(new ModalSurface())],
  ["save toast", new SaveSuccess(new ToastSurface())],
];

combinations.forEach(([label, notification]: [string, Notification]): void => {
  console.log(`${label}:\n  ${notification.show("Email address")}\n`);
});

// Adding a surface is ONE class, and all four kinds can use it immediately.
class PushSurface implements Surface {
  public present(title: string, body: string): string {
    return `{"notification":{"title":"${title}","body":"${body}"}}`;
  }
}

console.log("--- new surface, zero changes to any notification kind ---");
console.log(new SaveSuccess(new PushSurface()).show("Your profile"));
console.log(new UpgradePrompt(new PushSurface()).show("Advanced analytics"));
