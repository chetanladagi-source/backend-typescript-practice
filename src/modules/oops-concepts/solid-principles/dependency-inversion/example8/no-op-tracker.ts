// Silent implementation of `AnalyticsTracker` for tests and privacy-opted-out users.

import { AnalyticsTracker, EventProperties } from "./analytics-tracker";

export class NoOpTracker implements AnalyticsTracker {
  private readonly seen: string[] = [];

  public track(event: string, _properties: EventProperties): void {
    this.seen.push(event);
  }

  public seenEvents(): readonly string[] {
    return this.seen;
  }
}
