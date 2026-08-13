// LSP violation: Square overrides Rectangle setters and breaks the area contract.

export class Rectangle {
  protected width: number = 0;
  protected height: number = 0;

  public setWidth(width: number): void {
    this.width = width;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

  public getArea(): number {
    return this.width * this.height;
  }
}

// Violation: Rectangle promises width and height are independent; Square couples them.
export class Square extends Rectangle {
  public override setWidth(width: number): void {
    this.width = width;
    this.height = width;
  }

  public override setHeight(height: number): void {
    this.width = height;
    this.height = height;
  }
}

export function resizeAndExpectArea(shape: Rectangle): number {
  shape.setWidth(5);
  shape.setHeight(4);
  const area: number = shape.getArea();
  if (area !== 20) {
    throw new Error(`Broken contract: expected area 20 but received ${area}`);
  }
  return area;
}
