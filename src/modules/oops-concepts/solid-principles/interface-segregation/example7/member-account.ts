// Regular member that only exposes member operations.

import { MemberActions } from "./member-actions";

export class MemberAccount implements MemberActions {
  public constructor(private readonly userId: string) {}

  public viewProfile(): string {
    console.log("[member] viewing profile of", this.userId);
    return this.userId;
  }

  public updateOwnProfile(displayName: string): void {
    console.log("[member] display name is now", displayName);
  }

  public postComment(text: string): void {
    console.log("[member] commented:", text);
  }
}
