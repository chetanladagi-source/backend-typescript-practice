// Thermostat that switches power and holds a target temperature.

import { TemperatureAdjustable } from "./device-capabilities";
import { Switchable } from "./switchable";

export class SmartThermostat implements Switchable, TemperatureAdjustable {
  public turnOn(): void {
    console.log("[thermostat] heating enabled");
  }

  public turnOff(): void {
    console.log("[thermostat] heating disabled");
  }

  public setTemperature(celsius: number): void {
    console.log("[thermostat] target set to", celsius, "C");
  }
}
