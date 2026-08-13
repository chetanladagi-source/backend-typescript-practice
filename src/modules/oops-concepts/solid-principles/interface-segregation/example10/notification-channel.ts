// One narrow contract that every single-channel sender owns.

export interface NotificationChannel {
  readonly name: string;
  send(recipient: string, body: string): void;
}
