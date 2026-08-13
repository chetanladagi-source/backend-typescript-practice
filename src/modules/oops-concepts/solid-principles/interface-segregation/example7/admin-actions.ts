// Moderation operations reserved for administrators.

export interface AdminActions {
  banUser(userId: string): void;
  deleteAccount(userId: string): void;
}
