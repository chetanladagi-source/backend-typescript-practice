// Mediator — Example 1: a chat room.
// Users never hold references to each other; the room routes everything.

export interface ChatMediator {
  register(user: User): void;
  send(from: User, text: string, to?: string): void;
}

export abstract class User {
  protected mediator?: ChatMediator;

  constructor(public readonly name: string) {}

  public setMediator(mediator: ChatMediator): void {
    this.mediator = mediator;
  }

  public say(text: string, to?: string): void {
    this.mediator?.send(this, text, to);
  }

  public abstract receive(from: string, text: string): void;
}

class Member extends User {
  public receive(from: string, text: string): void {
    console.log(`  [${this.name}] ${from}: ${text}`);
  }
}

// A bot is just another participant — the mediator does not special-case it.
class Bot extends User {
  public receive(from: string, text: string): void {
    if (text.includes("/help")) {
      console.log(`  [${this.name}] replying to ${from} with the command list`);
      this.say(`${from}, try /deploy or /status`);
    }
  }
}

class ChatRoom implements ChatMediator {
  private readonly users: Map<string, User> = new Map<string, User>();
  private readonly banned: Set<string> = new Set<string>(["spammer"]);

  public register(user: User): void {
    this.users.set(user.name, user);
    user.setMediator(this);
    console.log(`  ${user.name} joined`);
  }

  // All the routing rules live here, in one readable place.
  public send(from: User, text: string, to?: string): void {
    if (this.banned.has(from.name)) {
      console.log(`  (message from banned user ${from.name} dropped)`);
      return;
    }

    if (to !== undefined) {
      const target: User | undefined = this.users.get(to);
      if (target === undefined) {
        console.log(`  (no such user: ${to})`);
        return;
      }
      console.log(`${from.name} -> ${to} (direct):`);
      target.receive(from.name, text);
      return;
    }

    console.log(`${from.name} -> everyone:`);
    this.users.forEach((user: User): void => {
      if (user !== from) {
        user.receive(from.name, text);
      }
    });
  }
}

// ---- Demo ----

const room: ChatRoom = new ChatRoom();

const ada: Member = new Member("ada");
const grace: Member = new Member("grace");
const spammer: Member = new Member("spammer");
const helper: Bot = new Bot("helperbot");

[ada, grace, spammer, helper].forEach((u: User): void => room.register(u));

ada.say("morning all");
grace.say("standup in 5", "ada");
ada.say("/help");
spammer.say("buy cheap followers");
grace.say("ping", "nobody");
