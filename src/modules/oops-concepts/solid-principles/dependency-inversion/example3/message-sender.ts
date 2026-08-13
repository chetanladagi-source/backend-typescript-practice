// Abstraction the notification policy depends on.

export interface MessageSender {
  channel(): string;
  send(recipient: string, body: string): void;
}
