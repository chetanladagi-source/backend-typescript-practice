// LSP violation: ReadOnlyList inherits MutableList but rejects add().

export class MutableList {
  protected readonly items: string[] = [];

  public add(item: string): void {
    this.items.push(item);
  }

  public size(): number {
    return this.items.length;
  }

  public toArray(): string[] {
    return [...this.items];
  }
}

// Violation: MutableList.add() promises the item is stored; ReadOnlyList throws instead.
export class ReadOnlyList extends MutableList {
  public constructor(seed: ReadonlyArray<string>) {
    super();
    this.items.push(...seed);
  }

  public override add(_item: string): void {
    throw new Error("ReadOnlyList does not support add()");
  }
}

export function appendTags(list: MutableList, tags: ReadonlyArray<string>): number {
  for (const tag of tags) {
    list.add(tag);
  }
  return list.size();
}
