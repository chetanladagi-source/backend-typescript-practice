// Runnable entry point contrasting the fat SmartDevice contract with per-capability contracts.

import { Dimmable, TemperatureAdjustable } from "./device-capabilities";
import { SmartBulb } from "./smart-bulb";
import { SmartDevice, SmartPlugViolation } from "./smart-device-violation";
import { SmartPlug } from "./smart-plug";
import { SmartThermostat } from "./smart-thermostat";
import { Switchable } from "./switchable";

console.log("=== Violation ===");
const fatPlug: SmartDevice = new SmartPlugViolation();
fatPlug.turnOn();
try {
  fatPlug.setBrightness(70);
} catch (error) {
  console.log("[violation] setBrightness failed:", (error as Error).message);
}
try {
  fatPlug.setTemperature(21);
} catch (error) {
  console.log("[violation] setTemperature failed:", (error as Error).message);
}
fatPlug.setVolume(30);
fatPlug.turnOff();

console.log("=== ISP applied ===");
const bulb: SmartBulb = new SmartBulb();
const thermostat: SmartThermostat = new SmartThermostat();
const devices: Switchable[] = [new SmartPlug(), bulb, thermostat];
for (const device of devices) {
  device.turnOn();
}

const dimmable: Dimmable = bulb;
const climate: TemperatureAdjustable = thermostat;
dimmable.setBrightness(70);
climate.setTemperature(21);

for (const device of devices) {
  device.turnOff();
}
