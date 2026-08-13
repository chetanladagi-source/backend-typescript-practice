// Optional dials that only some devices expose.

export interface Dimmable {
  setBrightness(level: number): void;
}

export interface TemperatureAdjustable {
  setTemperature(celsius: number): void;
}
