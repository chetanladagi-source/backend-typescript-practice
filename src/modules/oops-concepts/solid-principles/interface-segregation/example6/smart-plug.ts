// Plug that only promises power switching.

import { Switchable } from "./switchable";

export class SmartPlug implements Switchable {
  public turnOn(): void {
    console.log("[plug] powered on");
  }

  public turnOff(): void {
    console.log("[plug] powered off");
  }
}
