// Flyweight — Example 3: emoji assets in chat messages.
// Here the extrinsic state is passed as a METHOD ARGUMENT rather than stored,
// which is the purest form of the pattern.

export class EmojiGlyph {
  // Pretend `imageData` is a few KB of sprite bytes.
  constructor(
    public readonly shortcode: string,
    public readonly imageData: string,
  ) {}

  // Position and size are extrinsic: they arrive as parameters, never as fields.
  public renderAt(x: number, y: number, sizePx: number): string {
    return `<img src="${this.imageData}" alt="${this.shortcode}" style="left:${x};top:${y};size:${sizePx}">`;
  }
}

class EmojiFactory {
  private static readonly pool: Map<string, EmojiGlyph> = new Map<string, EmojiGlyph>();

  public static get(shortcode: string): EmojiGlyph {
    let glyph: EmojiGlyph | undefined = EmojiFactory.pool.get(shortcode);
    if (glyph === undefined) {
      console.log(`  [factory] loading sprite for ${shortcode}`);
      glyph = new EmojiGlyph(shortcode, `data:image/png;base64,SPRITE_${shortcode.toUpperCase()}`);
      EmojiFactory.pool.set(shortcode, glyph);
    }
    return glyph;
  }

  public static poolSize(): number {
    return EmojiFactory.pool.size;
  }
}

interface Placement {
  shortcode: string;
  x: number;
  y: number;
}

class ChatMessage {
  constructor(
    public readonly text: string,
    private readonly placements: Placement[],
  ) {}

  public render(): string {
    return this.placements
      .map((p: Placement): string => EmojiFactory.get(p.shortcode).renderAt(p.x, p.y, 16))
      .join("");
  }
}

// ---- Demo ----

const messages: ChatMessage[] = [
  new ChatMessage("ship it", [
    { shortcode: ":rocket:", x: 10, y: 4 },
    { shortcode: ":tada:", x: 30, y: 4 },
  ]),
  new ChatMessage("lgtm", [
    { shortcode: ":rocket:", x: 5, y: 2 },
    { shortcode: ":rocket:", x: 25, y: 2 },
  ]),
  new ChatMessage("nice", [{ shortcode: ":tada:", x: 12, y: 6 }]),
];

messages.forEach((m: ChatMessage): void => console.log(`${m.text}: ${m.render()}`));

// Five emoji usages across three messages, but only two sprites were ever loaded.
console.log("distinct glyphs loaded:", EmojiFactory.poolSize());
console.log("same glyph reused?", EmojiFactory.get(":rocket:") === EmojiFactory.get(":rocket:")); // true
