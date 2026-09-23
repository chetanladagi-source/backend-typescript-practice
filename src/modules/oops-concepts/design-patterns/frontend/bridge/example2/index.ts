// Bridge (frontend) — Example 2: a headless select.
// Behaviour (keyboard, selection, a11y state) is one hierarchy;
// presentation is another. This is how Radix and Headless UI are designed.

export interface SelectState {
  readonly options: readonly string[];
  readonly highlighted: number;
  readonly selected: string | undefined;
  readonly isOpen: boolean;
}

// --- Implementor: HOW the state is painted ---
export interface SelectView {
  render(state: SelectState): string;
}

class DropdownView implements SelectView {
  public render(state: SelectState): string {
    if (!state.isOpen) {
      return `<button aria-expanded="false">${state.selected ?? "Select…"} \u25be</button>`;
    }
    const items: string = state.options
      .map((o: string, i: number): string => {
        const active: boolean = i === state.highlighted;
        return `\n    <li role="option" aria-selected="${o === state.selected}"${active ? ' class="active"' : ""}>${o}</li>`;
      })
      .join("");
    return `<button aria-expanded="true">${state.selected ?? "Select…"} \u25b4</button>\n  <ul role="listbox">${items}\n  </ul>`;
  }
}

class RadioGroupView implements SelectView {
  public render(state: SelectState): string {
    const items: string = state.options
      .map(
        (o: string): string =>
          `\n  <label><input type="radio" name="opt"${o === state.selected ? " checked" : ""} /> ${o}</label>`,
      )
      .join("");
    return `<fieldset role="radiogroup">${items}\n</fieldset>`;
  }
}

class ChipListView implements SelectView {
  public render(state: SelectState): string {
    return state.options
      .map((o: string, i: number): string => {
        const cls: string = o === state.selected ? "chip chip--on" : i === state.highlighted ? "chip chip--hover" : "chip";
        return `<span class="${cls}">${o}</span>`;
      })
      .join(" ");
  }
}

// --- Abstraction: the behaviour, identical for every presentation ---
export class HeadlessSelect {
  private highlighted: number = 0;
  private selected: string | undefined;
  private isOpen: boolean = false;

  constructor(
    private readonly options: string[],
    private readonly view: SelectView,
  ) {}

  public handleKey(key: string): void {
    switch (key) {
      case "ArrowDown":
        this.isOpen = true;
        this.highlighted = (this.highlighted + 1) % this.options.length;
        break;
      case "ArrowUp":
        this.isOpen = true;
        this.highlighted = (this.highlighted - 1 + this.options.length) % this.options.length;
        break;
      case "Enter":
        this.selected = this.options[this.highlighted];
        this.isOpen = false;
        break;
      case "Escape":
        this.isOpen = false;
        break;
    }
  }

  public state(): SelectState {
    return {
      options: this.options,
      highlighted: this.highlighted,
      selected: this.selected,
      isOpen: this.isOpen,
    };
  }

  public render(): string {
    return this.view.render(this.state());
  }
}

// ---- Demo ----

const fruits: string[] = ["Apple", "Banana", "Cherry"];
const views: [string, SelectView][] = [
  ["dropdown", new DropdownView()],
  ["radio group", new RadioGroupView()],
  ["chip list", new ChipListView()],
];

views.forEach(([name, view]: [string, SelectView]): void => {
  const select: HeadlessSelect = new HeadlessSelect(fruits, view);

  // Exactly the same interaction sequence for every presentation.
  select.handleKey("ArrowDown");
  select.handleKey("ArrowDown");

  console.log(`=== ${name} (after two ArrowDowns) ===`);
  console.log(select.render());

  select.handleKey("Enter");
  console.log(`--- ${name} (after Enter) ---`);
  console.log(select.render());
  console.log("");
});
