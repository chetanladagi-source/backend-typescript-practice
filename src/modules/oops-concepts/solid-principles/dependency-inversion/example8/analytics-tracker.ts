// Abstraction the checkout policy depends on.

export type EventProperties = Record<string, string | number>;

export interface AnalyticsTracker {
  track(event: string, properties: EventProperties): void;
}
