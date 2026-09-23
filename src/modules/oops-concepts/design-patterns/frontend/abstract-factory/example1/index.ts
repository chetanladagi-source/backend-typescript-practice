// Abstract Factory (frontend) — Example 1: theme kits.
// Button, input and card must all come from the SAME theme.

export interface Button {
  render(label: string): string;
}
export interface Input {
  render(placeholder: string): string;
}
export interface Card {
  render(title: string, body: string): string;
}

// --- Light family ---

class LightButton implements Button {
  public render(label: string): string {
    return `<button style="background:#2563eb;color:#fff">${label}</button>`;
  }
}
class LightInput implements Input {
  public render(placeholder: string): string {
    return `<input style="background:#fff;color:#111;border:1px solid #d1d5db" placeholder="${placeholder}" />`;
  }
}
class LightCard implements Card {
  public render(title: string, body: string): string {
    return `<div style="background:#fff;color:#111;box-shadow:0 1px 3px #0002"><h3>${title}</h3><p>${body}</p></div>`;
  }
}

// --- Dark family ---

class DarkButton implements Button {
  public render(label: string): string {
    return `<button style="background:#3b82f6;color:#0b1020">${label}</button>`;
  }
}
class DarkInput implements Input {
  public render(placeholder: string): string {
    return `<input style="background:#111827;color:#f9fafb;border:1px solid #374151" placeholder="${placeholder}" />`;
  }
}
class DarkCard implements Card {
  public render(title: string, body: string): string {
    return `<div style="background:#111827;color:#f9fafb;box-shadow:0 1px 3px #000a"><h3>${title}</h3><p>${body}</p></div>`;
  }
}

export interface ThemeKit {
  readonly name: string;
  createButton(): Button;
  createInput(): Input;
  createCard(): Card;
}

class LightTheme implements ThemeKit {
  public readonly name: string = "light";
  public createButton(): Button {
    return new LightButton();
  }
  public createInput(): Input {
    return new LightInput();
  }
  public createCard(): Card {
    return new LightCard();
  }
}

class DarkTheme implements ThemeKit {
  public readonly name: string = "dark";
  public createButton(): Button {
    return new DarkButton();
  }
  public createInput(): Input {
    return new DarkInput();
  }
  public createCard(): Card {
    return new DarkCard();
  }
}

// The "provider": one place decides the family for the whole tree.
let activeTheme: ThemeKit = new LightTheme();
export function useTheme(): ThemeKit {
  return activeTheme;
}

// A screen built from whatever kit the provider supplies. Written once.
function renderLoginScreen(): string {
  const theme: ThemeKit = useTheme();
  return [
    `<!-- theme: ${theme.name} -->`,
    theme.createCard().render("Sign in", "Welcome back."),
    theme.createInput().render("you@example.com"),
    theme.createButton().render("Continue"),
  ].join("\n");
}

// ---- Demo ----

console.log(renderLoginScreen());

console.log("\n--- user flips the theme toggle ---\n");
activeTheme = new DarkTheme();
console.log(renderLoginScreen());

// The guarantee: you cannot build a screen with a dark card and a light button,
// because components are only ever obtained from one kit.
