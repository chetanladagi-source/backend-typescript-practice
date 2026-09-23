// Adapter — Example 3: a partner's XML-only API behind a normal repository interface.
// Data-format adaptation, not just method-name adaptation.

export interface User {
  id: string;
  name: string;
  active: boolean;
}

export interface UserRepository {
  findAll(): User[];
}

// --- Adaptee: an internal service that only speaks XML strings ---
class LegacyXmlUserApi {
  public fetchUsersXml(): string {
    return `<users>
      <user id="u1"><name>Ada</name><status>ACTIVE</status></user>
      <user id="u2"><name>Grace</name><status>DISABLED</status></user>
    </users>`;
  }
}

// --- Adapter: parses XML into the domain objects the app expects ---
class XmlUserRepositoryAdapter implements UserRepository {
  constructor(private readonly api: LegacyXmlUserApi = new LegacyXmlUserApi()) {}

  public findAll(): User[] {
    const xml: string = this.api.fetchUsersXml();
    const entries: RegExpMatchArray[] = [
      ...xml.matchAll(/<user id="(.*?)"><name>(.*?)<\/name><status>(.*?)<\/status><\/user>/g),
    ];
    return entries.map((m: RegExpMatchArray): User => ({
      id: m[1],
      name: m[2],
      active: m[3] === "ACTIVE",
    }));
  }
}

// A normal JSON-backed repository, for contrast.
class JsonUserRepository implements UserRepository {
  public findAll(): User[] {
    return [{ id: "u3", name: "Linus", active: true }];
  }
}

// Consumer code has no idea XML exists anywhere in the system.
function printActiveUsers(repo: UserRepository): void {
  repo
    .findAll()
    .filter((u: User): boolean => u.active)
    .forEach((u: User): void => console.log(`active: ${u.id} ${u.name}`));
}

// ---- Demo ----

console.log("from the XML service:");
printActiveUsers(new XmlUserRepositoryAdapter());

console.log("from the JSON service:");
printActiveUsers(new JsonUserRepository());

// Both sources can be treated as one list.
const all: User[] = [...new XmlUserRepositoryAdapter().findAll(), ...new JsonUserRepository().findAll()];
console.log("combined count:", all.length);
