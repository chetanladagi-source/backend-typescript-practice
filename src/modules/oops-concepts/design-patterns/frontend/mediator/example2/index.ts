// Mediator (frontend) — Example 2: a dialog manager.
// Modals, drawers and toasts all want to be on screen. One object decides who wins.

type Layer = "modal" | "drawer" | "toast";

interface Overlay {
  id: string;
  layer: Layer;
  dismissible: boolean;
}

export class OverlayMediator {
  private readonly modalStack: Overlay[] = [];
  private drawer?: Overlay;
  private readonly toasts: Overlay[] = [];
  private scrollLocked: boolean = false;

  public open(overlay: Overlay): void {
    console.log(`\nopen ${overlay.layer} "${overlay.id}"`);

    if (overlay.layer === "drawer") {
      // Only one drawer at a time; opening a second closes the first.
      if (this.drawer !== undefined) {
        console.log(`  closing drawer "${this.drawer.id}" first`);
      }
      this.drawer = overlay;
    } else if (overlay.layer === "modal") {
      // A modal takes over: the drawer gets out of the way.
      if (this.drawer !== undefined) {
        console.log(`  a modal opened — closing drawer "${this.drawer.id}"`);
        this.drawer = undefined;
      }
      this.modalStack.push(overlay);
    } else {
      // Toasts never block anything, so they just stack.
      this.toasts.push(overlay);
    }

    this.sync();
  }

  public dismissTop(): void {
    console.log("\nEscape pressed");
    // Escape goes to the topmost blocking layer, not to the page.
    const modal: Overlay | undefined = this.modalStack[this.modalStack.length - 1];
    if (modal !== undefined) {
      if (!modal.dismissible) {
        console.log(`  modal "${modal.id}" is not dismissible — ignored`);
        return;
      }
      this.modalStack.pop();
      console.log(`  closed modal "${modal.id}"`);
    } else if (this.drawer !== undefined) {
      console.log(`  closed drawer "${this.drawer.id}"`);
      this.drawer = undefined;
    } else {
      console.log("  no overlay open — the page-level Escape handler runs (close command palette)");
      return;
    }
    this.sync();
  }

  public expireToasts(): void {
    console.log(`\n${this.toasts.length} toast(s) expired`);
    this.toasts.length = 0;
    this.sync();
  }

  // One place decides the derived, global side effects.
  private sync(): void {
    const blocking: boolean = this.modalStack.length > 0 || this.drawer !== undefined;
    if (blocking !== this.scrollLocked) {
      this.scrollLocked = blocking;
      console.log(`  body scroll ${blocking ? "locked" : "unlocked"}`);
    }
    const focusTarget: string =
      this.modalStack[this.modalStack.length - 1]?.id ?? this.drawer?.id ?? "page";
    console.log(
      `  modals=[${this.modalStack.map((m: Overlay): string => m.id).join(",")}]` +
        ` drawer=${this.drawer?.id ?? "-"} toasts=${this.toasts.length} focus=${focusTarget}`,
    );
  }
}

// ---- Demo ----

const overlays: OverlayMediator = new OverlayMediator();

overlays.open({ id: "filters", layer: "drawer", dismissible: true });
overlays.open({ id: "cart", layer: "drawer", dismissible: true }); // replaces filters
overlays.open({ id: "confirm-delete", layer: "modal", dismissible: true }); // closes the drawer
overlays.open({ id: "saved", layer: "toast", dismissible: true }); // coexists happily
overlays.open({ id: "payment", layer: "modal", dismissible: false }); // stacks on top

overlays.dismissTop(); // refused: payment is not dismissible
overlays.expireToasts();
