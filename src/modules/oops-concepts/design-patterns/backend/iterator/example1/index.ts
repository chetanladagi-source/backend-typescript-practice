// Iterator — Example 1: one collection, three traversal orders.
// The playlist never exposes its internal array.

export interface Track {
  title: string;
  seconds: number;
}

// The classic explicit iterator interface, for comparison with the JS protocol below.
export interface PlaylistIterator {
  hasNext(): boolean;
  next(): Track;
}

class ForwardIterator implements PlaylistIterator {
  private index: number = 0;
  constructor(private readonly tracks: readonly Track[]) {}

  public hasNext(): boolean {
    return this.index < this.tracks.length;
  }
  public next(): Track {
    return this.tracks[this.index++];
  }
}

class ReverseIterator implements PlaylistIterator {
  private index: number;
  constructor(private readonly tracks: readonly Track[]) {
    this.index = tracks.length - 1;
  }

  public hasNext(): boolean {
    return this.index >= 0;
  }
  public next(): Track {
    return this.tracks[this.index--];
  }
}

class ShuffleIterator implements PlaylistIterator {
  private readonly order: number[];
  private position: number = 0;

  // A seeded shuffle so the demo output is reproducible.
  constructor(private readonly tracks: readonly Track[], seed: number = 7) {
    this.order = tracks.map((_: Track, i: number): number => i);
    for (let i = this.order.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j: number = Math.floor((seed / 233280) * (i + 1));
      [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
    }
  }

  public hasNext(): boolean {
    return this.position < this.order.length;
  }
  public next(): Track {
    return this.tracks[this.order[this.position++]];
  }
}

class Playlist {
  private readonly tracks: Track[] = [];

  public add(title: string, seconds: number): this {
    this.tracks.push({ title, seconds });
    return this;
  }

  public forward(): PlaylistIterator {
    return new ForwardIterator(this.tracks);
  }
  public reverse(): PlaylistIterator {
    return new ReverseIterator(this.tracks);
  }
  public shuffle(): PlaylistIterator {
    return new ShuffleIterator(this.tracks);
  }

  // Implementing the JS protocol makes the playlist work with for...of and spread.
  public [Symbol.iterator](): Iterator<Track> {
    let i: number = 0;
    const tracks: Track[] = this.tracks;
    return {
      next(): IteratorResult<Track> {
        return i < tracks.length ? { value: tracks[i++], done: false } : { value: undefined, done: true };
      },
    };
  }
}

// ---- Demo ----

const playlist: Playlist = new Playlist()
  .add("Blue in Green", 327)
  .add("So What", 545)
  .add("All Blues", 693)
  .add("Flamenco Sketches", 566);

const play = (label: string, it: PlaylistIterator): void => {
  const titles: string[] = [];
  while (it.hasNext()) {
    titles.push(it.next().title);
  }
  console.log(`${label}: ${titles.join(" | ")}`);
};

play("forward", playlist.forward());
play("reverse", playlist.reverse());
play("shuffle", playlist.shuffle());

// Because of [Symbol.iterator], the language features work too.
console.log("--- via the JS iterable protocol ---");
for (const track of playlist) {
  console.log(`  ${track.title} (${track.seconds}s)`);
}
console.log("total seconds:", [...playlist].reduce((s: number, t: Track): number => s + t.seconds, 0));
