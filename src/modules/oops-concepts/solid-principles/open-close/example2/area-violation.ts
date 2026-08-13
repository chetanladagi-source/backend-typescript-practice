// Violating design: one calculator that inspects a shape's type tag.

export interface ShapeData {
  type: string;
  width?: number;
  height?: number;
  radius?: number;
  base?: number;
}

export class LegacyAreaCalculator {
  // OCP violation: a new shape means editing this switch and its optional fields.
  public area(shape: ShapeData): number {
    switch (shape.type) {
      case "rectangle":
        return (shape.width ?? 0) * (shape.height ?? 0);
      case "circle":
        return Math.PI * (shape.radius ?? 0) * (shape.radius ?? 0);
      default:
        console.log(`Unknown shape: ${shape.type}`);
        return 0;
    }
  }
}
