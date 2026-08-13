// Operations every signed-in member may perform.

export interface MemberActions {
  viewProfile(): string;
  updateOwnProfile(displayName: string): void;
  postComment(text: string): void;
}
