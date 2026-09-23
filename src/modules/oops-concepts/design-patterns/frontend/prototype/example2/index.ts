// Prototype (frontend) — Example 2: duplicating a design-canvas layer.
// Nested children, a Map of styles, and a Date: the cases that break
// JSON.parse(JSON.stringify(x)).

export interface Layer {
  id: string;
  name: string;
  x: number;
  y: number;
  styles: Map<string, string>;
  createdAt: Date;
  children: Layer[];
}

let nextId: number = 1;
const makeId = (): string => `layer-${nextId++}`;

// structuredClone handles Map, Date, Set and cycles — unlike the JSON round-trip.
export function duplicateLayer(layer: Layer, offset: number = 16): Layer {
  const clone: Layer = structuredClone(layer);
  reassignIds(clone);
  clone.name = `${layer.name} copy`;
  clone.x += offset;
  clone.y += offset;
  return clone;
}

// Cloned nodes must get fresh ids, or selection and keyed rendering break.
function reassignIds(layer: Layer): void {
  layer.id = makeId();
  layer.children.forEach(reassignIds);
}

const render = (layer: Layer, indent: string = ""): void => {
  const styles: string = [...layer.styles].map(([k, v]: [string, string]): string => `${k}:${v}`).join("; ");
  console.log(`${indent}${layer.id} "${layer.name}" at (${layer.x},${layer.y}) {${styles}}`);
  layer.children.forEach((c: Layer): void => render(c, `${indent}  `));
};

// ---- Demo ----

const card: Layer = {
  id: makeId(),
  name: "Card",
  x: 0,
  y: 0,
  styles: new Map<string, string>([["radius", "8px"], ["shadow", "md"]]),
  createdAt: new Date("2031-01-01T10:00:00Z"),
  children: [
    {
      id: makeId(),
      name: "Title",
      x: 8,
      y: 8,
      styles: new Map<string, string>([["font", "bold 16px"]]),
      createdAt: new Date("2031-01-01T10:00:00Z"),
      children: [],
    },
  ],
};

console.log("original:");
render(card);

const copy: Layer = duplicateLayer(card);
console.log("\nduplicated:");
render(copy);

// Editing the copy leaves the original alone, all the way down the tree.
copy.styles.set("radius", "24px");
copy.children[0].name = "Heading";

console.log("\nafter editing the copy:");
render(card);
render(copy);

console.log("\nindependent styles Map? ", card.styles.get("radius") === "8px");
console.log("Date survived the clone?", copy.createdAt instanceof Date, copy.createdAt.toISOString());

// What the JSON trick would have done to the same object:
const viaJson = JSON.parse(JSON.stringify(card)) as Record<string, unknown>;
console.log("JSON round-trip styles ->", viaJson.styles, "(Map became an empty object)");
console.log("JSON round-trip date   ->", typeof viaJson.createdAt, "(Date became a string)");
