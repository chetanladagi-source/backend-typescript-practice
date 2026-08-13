// Administrator that opts into both member and moderation contracts.

import { AdminActions } from "./admin-actions";
import { MemberActions } from "./member-actions";

export class AdminAccount implements MemberActions, AdminActions {
  public constructor(private readonly userId: string) {}

  public viewProfile(): string {
    console.log("[admin] viewing profile of", this.userId);
    return this.userId;
  }

  public updateOwnProfile(displayName: string): void {
    console.log("[admin] display name is now", displayName);
  }

  public postComment(text: string): void {
    console.log("[admin] commented:", text);
  }

  public banUser(userId: string): void {
    console.log("[admin] banned", userId);
  }

  public deleteAccount(userId: string): void {
    console.log("[admin] deleted account", userId);
  }
}
