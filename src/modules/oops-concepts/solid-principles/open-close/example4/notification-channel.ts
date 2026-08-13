// Abstraction that every delivery channel implements.

export interface NotificationChannel {
  readonly channel: string;
  deliver(to: string, message: string): void;
}
