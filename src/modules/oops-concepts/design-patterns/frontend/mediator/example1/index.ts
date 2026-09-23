// Mediator (frontend) — Example 1: a checkout form whose fields depend on each other.
// No field knows about any other field. They only know the mediator.

interface FieldState {
  value: string;
  options?: string[];
  disabled: boolean;
  visible: boolean;
}

export class FormMediator {
  private readonly fields: Map<string, FieldState> = new Map<string, FieldState>();

  constructor() {
    this.fields.set("country", { value: "", options: ["IN", "US"], disabled: false, visible: true });
    this.fields.set("state", { value: "", options: [], disabled: true, visible: true });
    this.fields.set("postcode", { value: "", disabled: true, visible: true });
    this.fields.set("gstin", { value: "", disabled: false, visible: false });
    this.fields.set("sameAsBilling", { value: "no", disabled: false, visible: true });
    this.fields.set("shippingLine1", { value: "", disabled: false, visible: true });
  }

  // The ONE place that knows how fields relate.
  public changed(field: string, value: string): void {
    console.log(`\n${field} = "${value}"`);
    const state: FieldState | undefined = this.fields.get(field);
    if (state === undefined || state.disabled) {
      console.log("  (field is disabled — change rejected)");
      return;
    }
    state.value = value;

    if (field === "country") {
      // Dependent fields must be reloaded AND cleared, or you ship a US postcode with country=IN.
      this.set("state", {
        options: value === "IN" ? ["KA", "MH", "TN"] : ["CA", "NY"],
        value: "",
        disabled: false,
      });
      this.set("postcode", { value: "", disabled: true });
      this.set("gstin", { visible: value === "IN", value: "" });
    }

    if (field === "state") {
      // Postcode only makes sense once a state is chosen.
      this.set("postcode", { disabled: value === "" });
    }

    if (field === "sameAsBilling") {
      this.set("shippingLine1", { disabled: value === "yes", value: value === "yes" ? "(copied from billing)" : "" });
    }

    this.render();
  }

  private set(field: string, patch: Partial<FieldState>): void {
    const state: FieldState | undefined = this.fields.get(field);
    if (state !== undefined) {
      Object.assign(state, patch);
    }
  }

  public isSubmittable(): boolean {
    const required: string[] = ["country", "state", "postcode", "shippingLine1"];
    return required.every((f: string): boolean => (this.fields.get(f)?.value ?? "") !== "");
  }

  private render(): void {
    this.fields.forEach((state: FieldState, name: string): void => {
      if (!state.visible) {
        return;
      }
      const flags: string = [
        state.disabled ? "disabled" : "",
        state.options !== undefined ? `options=[${state.options.join(",")}]` : "",
      ]
        .filter((s: string): boolean => s !== "")
        .join(" ");
      console.log(`  ${name.padEnd(15)} "${state.value}" ${flags}`);
    });
    console.log(`  submit button: ${this.isSubmittable() ? "enabled" : "disabled"}`);
  }
}

// ---- Demo ----

const form: FormMediator = new FormMediator();

form.changed("postcode", "560001"); // rejected: still disabled
form.changed("country", "IN"); // loads states, reveals GSTIN
form.changed("state", "KA"); // unlocks postcode
form.changed("postcode", "560001");
form.changed("sameAsBilling", "yes"); // fills and locks the shipping line

console.log("\n--- user switches country after filling everything ---");
form.changed("country", "US"); // state/postcode cleared, GSTIN hidden
