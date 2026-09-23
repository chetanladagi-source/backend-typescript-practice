// Iterator (frontend) — Example 1: a carousel.
// Two different traversals over the same collection, and the collection
// never exposes how it stores anything.

interface Slide {
  id: string;
  hidden: boolean;
}

export class Carousel implements Iterable<Slide> {
  // Private on purpose: callers must go through an iterator, not an index.
  private readonly slides: Slide[];

  constructor(slides: Slide[]) {
    this.slides = slides;
  }

  // The default traversal: visible slides only, front to back, finite.
  public [Symbol.iterator](): Iterator<Slide> {
    let index: number = 0;
    const visible: Slide[] = this.slides.filter((s: Slide): boolean => !s.hidden);
    return {
      next: (): IteratorResult<Slide> =>
        index < visible.length
          ? { done: false, value: visible[index++] as Slide }
          : { done: true, value: undefined },
    };
  }

  // A second, INFINITE traversal: what the next/prev arrows actually use.
  public cycle(startAt: number = 0): CarouselCursor {
    return new CarouselCursor(this.slides.filter((s: Slide): boolean => !s.hidden), startAt);
  }
}

export class CarouselCursor {
  constructor(private readonly visible: Slide[], private position: number) {}

  public current(): Slide {
    return this.visible[this.position] as Slide;
  }

  public next(): Slide {
    this.position = (this.position + 1) % this.visible.length;
    return this.current();
  }

  public prev(): Slide {
    // The +length is what stops -1 % n from returning -1.
    this.position = (this.position - 1 + this.visible.length) % this.visible.length;
    return this.current();
  }

  public dots(): string {
    return this.visible
      .map((_: Slide, i: number): string => (i === this.position ? "(*)" : "( )"))
      .join("");
  }
}

// ---- Demo ----

const carousel: Carousel = new Carousel([
  { id: "hero", hidden: false },
  { id: "promo", hidden: true }, // seasonal, currently off
  { id: "reviews", hidden: false },
  { id: "faq", hidden: false },
]);

// Because it implements Symbol.iterator, the language features come free.
console.log("for...of skips hidden slides:");
for (const slide of carousel) {
  console.log(`  ${slide.id}`);
}
console.log("spread:", [...carousel].map((s: Slide): string => s.id).join(", "));

console.log("\nclicking next past the end wraps around:");
const cursor: CarouselCursor = carousel.cycle();
console.log(`  ${cursor.dots()} ${cursor.current().id}`);
for (let i = 0; i < 4; i++) {
  const slide: Slide = cursor.next();
  console.log(`  ${cursor.dots()} ${slide.id}`);
}

console.log("\nclicking prev from the first slide wraps backwards:");
const back: CarouselCursor = carousel.cycle();
console.log(`  ${back.dots()} ${back.current().id}`);
const previous: Slide = back.prev();
console.log(`  ${back.dots()} ${previous.id}`);

console.log("\ntwo cursors on the same carousel do not interfere:");
const a: CarouselCursor = carousel.cycle();
const b: CarouselCursor = carousel.cycle();
b.next();
b.next();
console.log(`  cursor a: ${a.dots()} ${a.current().id}`);
console.log(`  cursor b: ${b.dots()} ${b.current().id}`);
