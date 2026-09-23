// Abstract Factory (frontend) — Example 2: one design system, two render targets.
// Email HTML is a genuinely different platform: no flexbox, no <button>, tables only.

export interface Heading {
  render(text: string): string;
}
export interface Layout {
  render(children: string[]): string;
}
export interface CallToAction {
  render(label: string, href: string): string;
}

// --- Web family: modern HTML/CSS ---

class WebHeading implements Heading {
  public render(text: string): string {
    return `<h1 class="text-2xl font-bold">${text}</h1>`;
  }
}
class WebLayout implements Layout {
  public render(children: string[]): string {
    return `<div class="flex flex-col gap-4">\n  ${children.join("\n  ")}\n</div>`;
  }
}
class WebCta implements CallToAction {
  public render(label: string, href: string): string {
    return `<a class="btn btn-primary" href="${href}">${label}</a>`;
  }
}

// --- Email family: tables and inline styles, because Outlook ---

class EmailHeading implements Heading {
  public render(text: string): string {
    return `<h1 style="font-family:Arial,sans-serif;font-size:24px;margin:0 0 16px">${text}</h1>`;
  }
}
class EmailLayout implements Layout {
  public render(children: string[]): string {
    const rows: string = children
      .map((c: string): string => `    <tr><td style="padding:8px 0">${c}</td></tr>`)
      .join("\n");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">\n${rows}\n</table>`;
  }
}
class EmailCta implements CallToAction {
  public render(label: string, href: string): string {
    // No CSS classes and no <button>: email clients strip both.
    return `<a href="${href}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 20px;text-decoration:none;border-radius:4px">${label}</a>`;
  }
}

export interface UiKit {
  readonly target: string;
  createHeading(): Heading;
  createLayout(): Layout;
  createCta(): CallToAction;
}

class WebKit implements UiKit {
  public readonly target: string = "web";
  public createHeading(): Heading {
    return new WebHeading();
  }
  public createLayout(): Layout {
    return new WebLayout();
  }
  public createCta(): CallToAction {
    return new WebCta();
  }
}

class EmailKit implements UiKit {
  public readonly target: string = "email";
  public createHeading(): Heading {
    return new EmailHeading();
  }
  public createLayout(): Layout {
    return new EmailLayout();
  }
  public createCta(): CallToAction {
    return new EmailCta();
  }
}

// One template definition, rendered by whichever kit it is handed.
function welcomeTemplate(kit: UiKit, name: string): string {
  return kit.createLayout().render([
    kit.createHeading().render(`Welcome, ${name}!`),
    "<p>Your workspace is ready.</p>",
    kit.createCta().render("Open dashboard", "https://app.example.com"),
  ]);
}

// ---- Demo ----

console.log("=== web ===");
console.log(welcomeTemplate(new WebKit(), "Ada"));

console.log("\n=== email ===");
console.log(welcomeTemplate(new EmailKit(), "Ada"));
