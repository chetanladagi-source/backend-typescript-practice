// Fat account contract mixing member and admin operations.

export interface UserActions {
  viewProfile(): string;
  updateOwnProfile(displayName: string): void;
  postComment(text: string): void;
  banUser(userId: string): void;
  deleteAccount(userId: string): void;
}

// ISP violation: a regular member is handed moderation methods it must refuse at runtime.
export class MemberAccountViolation implements UserActions {
  public constructor(private readonly userId: string) {}

  public viewProfile(): string {
    console.log("[violation-member] viewing profile of", this.userId);
    return this.userId;
  }

  public updateOwnProfile(displayName: string): void {
    console.log("[violation-member] display name is now", displayName);
  }

  public postComment(text: string): void {
    console.log("[violation-member] commented:", text);
  }

  public banUser(userId: string): void {
    throw new Error(`Member ${this.userId} is not allowed to ban ${userId}`);
  }

  public deleteAccount(userId: string): void {
    throw new Error(`Member ${this.userId} is not allowed to delete ${userId}`);
  }
}
