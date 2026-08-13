// Bulb that switches power and dims.

import { Dimmable } from "./device-capabilities";
import { Switchable } from "./switchable";

export class SmartBulb implements Switchable, Dimmable {
  public turnOn(): void {
    console.log("[bulb] lit");
  }

  public turnOff(): void {
    console.log("[bulb] dark");
  }

  public setBrightness(level: number): void {
    console.log("[bulb] brightness set to", level, "%");
  }
}
