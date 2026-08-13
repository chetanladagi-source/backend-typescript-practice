// Fat vehicle contract covering every travel medium.

export interface Vehicle {
  drive(km: number): void;
  fly(km: number): void;
  sail(km: number): void;
}

// ISP violation: a car must implement flying and sailing to be a Vehicle.
export class CarViolation implements Vehicle {
  public drive(km: number): void {
    console.log("[violation-car] driving", km, "km");
  }

  public fly(km: number): void {
    throw new Error(`A car cannot fly ${km} km`);
  }

  public sail(km: number): void {
    throw new Error(`A car cannot sail ${km} km`);
  }
}
