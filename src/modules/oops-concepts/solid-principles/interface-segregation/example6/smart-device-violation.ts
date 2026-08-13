// Fat smart-home contract shared by every device.

export interface SmartDevice {
  turnOn(): void;
  turnOff(): void;
  setBrightness(level: number): void;
  setTemperature(celsius: number): void;
  setVolume(level: number): void;
}

// ISP violation: a plug that can only switch power must implement three unrelated dials.
export class SmartPlugViolation implements SmartDevice {
  private powered: boolean = false;

  public turnOn(): void {
    this.powered = true;
    console.log("[violation-plug] powered on");
  }

  public turnOff(): void {
    this.powered = false;
    console.log("[violation-plug] powered off");
  }

  public isPowered(): boolean {
    return this.powered;
  }

  public setBrightness(level: number): void {
    throw new Error(`Smart plug has no lamp, cannot set brightness to ${level}`);
  }

  public setTemperature(celsius: number): void {
    throw new Error(`Smart plug has no thermostat, cannot set ${celsius}C`);
  }

  public setVolume(level: number): void {
    console.log("[violation-plug] setVolume(", level, ") is a meaningless no-op");
  }
}
