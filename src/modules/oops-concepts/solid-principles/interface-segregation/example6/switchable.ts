// The only capability every smart device shares.

export interface Switchable {
  turnOn(): void;
  turnOff(): void;
}
