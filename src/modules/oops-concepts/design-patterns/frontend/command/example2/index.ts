// Command (frontend) — Example 2: one command registry driving both
// a Cmd+K palette and keyboard shortcuts. Define an action once, expose it twice.

export interface AppCommand {
  readonly id: string;
  readonly title: string;
  readonly shortcut?: string;
  readonly keywords: string[];
  isEnabled(): boolean;
  run(): void;
}

// Some app state the commands act on and check against.
const app = {
  selectionCount: 0,
  sidebarOpen: true,
  savedAt: undefined as string | undefined,
};

const commands: AppCommand[] = [
  {
    id: "file.save",
    title: "Save document",
    shortcut: "Mod+S",
    keywords: ["save", "write", "persist"],
    isEnabled: (): boolean => true,
    run: (): void => {
      app.savedAt = "12:04";
      console.log("    saved at 12:04");
    },
  },
  {
    id: "edit.delete",
    title: "Delete selection",
    shortcut: "Backspace",
    keywords: ["delete", "remove", "erase"],
    // Disabled when nothing is selected — the palette must reflect this.
    isEnabled: (): boolean => app.selectionCount > 0,
    run: (): void => {
      console.log(`    deleted ${app.selectionCount} item(s)`);
      app.selectionCount = 0;
    },
  },
  {
    id: "view.toggleSidebar",
    title: "Toggle sidebar",
    shortcut: "Mod+B",
    keywords: ["sidebar", "panel", "layout"],
    isEnabled: (): boolean => true,
    run: (): void => {
      app.sidebarOpen = !app.sidebarOpen;
      console.log(`    sidebar ${app.sidebarOpen ? "opened" : "closed"}`);
    },
  },
  {
    id: "help.shortcuts",
    title: "Show keyboard shortcuts",
    keywords: ["help", "keys", "cheatsheet"],
    isEnabled: (): boolean => true,
    run: (): void => console.log("    opened the shortcuts dialog"),
  },
];

// --- Surface 1: the Cmd+K palette ---
function searchPalette(query: string): AppCommand[] {
  const q: string = query.toLowerCase();
  return commands.filter(
    (c: AppCommand): boolean =>
      c.title.toLowerCase().includes(q) || c.keywords.some((k: string): boolean => k.includes(q)),
  );
}

function renderPalette(query: string): void {
  console.log(`\nCmd+K "${query}"`);
  const results: AppCommand[] = searchPalette(query);
  if (results.length === 0) {
    console.log("  no matching commands");
    return;
  }
  results.forEach((c: AppCommand): void => {
    const state: string = c.isEnabled() ? "" : "  (disabled)";
    console.log(`  ${c.title.padEnd(26)} ${(c.shortcut ?? "").padEnd(10)}${state}`);
  });
}

// --- Surface 2: keyboard shortcuts, built from the same registry ---
const keymap: Map<string, AppCommand> = new Map(
  commands
    .filter((c: AppCommand): c is AppCommand & { shortcut: string } => c.shortcut !== undefined)
    .map((c): [string, AppCommand] => [c.shortcut, c]),
);

function pressKey(combo: string): void {
  console.log(`\nkeypress ${combo}`);
  const command: AppCommand | undefined = keymap.get(combo);
  if (command === undefined) {
    console.log("  unbound");
    return;
  }
  if (!command.isEnabled()) {
    console.log(`  ${command.title} is currently disabled`);
    return;
  }
  command.run();
}

// ---- Demo ----

renderPalette("s");
renderPalette("delete");

pressKey("Mod+S");
pressKey("Backspace"); // disabled: nothing selected

console.log("\nuser selects 3 items");
app.selectionCount = 3;

pressKey("Backspace"); // now enabled
pressKey("Mod+B");
pressKey("Mod+Q"); // unbound

renderPalette("xyz");
