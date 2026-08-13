// Runnable entry point contrasting the mixed UserActions contract with role-based contracts.

import { AdminAccount } from "./admin-account";
import { AdminActions } from "./admin-actions";
import { MemberAccount } from "./member-account";
import { MemberActions } from "./member-actions";
import { MemberAccountViolation, UserActions } from "./user-actions-violation";

console.log("=== Violation ===");
const fatMember: UserActions = new MemberAccountViolation("u-42");
fatMember.viewProfile();
fatMember.postComment("nice write-up");
try {
  fatMember.banUser("u-7");
} catch (error) {
  console.log("[violation] banUser failed:", (error as Error).message);
}
try {
  fatMember.deleteAccount("u-7");
} catch (error) {
  console.log("[violation] deleteAccount failed:", (error as Error).message);
}

console.log("=== ISP applied ===");
const member: MemberActions = new MemberAccount("u-42");
member.viewProfile();
member.updateOwnProfile("Ada L.");
member.postComment("nice write-up");

const admin: AdminAccount = new AdminAccount("u-1");
const moderation: AdminActions = admin;
moderation.banUser("u-7");
moderation.deleteAccount("u-7");
