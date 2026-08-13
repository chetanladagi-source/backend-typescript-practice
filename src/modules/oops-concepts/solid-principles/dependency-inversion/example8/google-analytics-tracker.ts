// Vendor implementation of `AnalyticsTracker`; the beacon request is simulated.

import { AnalyticsTracker, EventProperties } from "./analytics-tracker";

export class GoogleAnalyticsTracker implements AnalyticsTracker {
  constructor(private readonly measurementId: string) {}

  public track(event: string, properties: EventProperties): void {
    const query: string = Object.entries(properties)
      .map(([key, value]: [string, string | number]) => `${key}=${String(value)}`)
      .join("&");
    console.log(`[ga:${this.measurementId}] POST /collect?en=${event}&${query}`);
  }
}
