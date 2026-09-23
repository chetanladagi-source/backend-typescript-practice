// Adapter (frontend) — Example 1: an anti-corruption layer over two API versions.
// Components depend on UserViewModel and never on a payload shape.

// --- Target: what the UI actually wants ---
export interface UserViewModel {
  id: string;
  fullName: string;
  initials: string;
  email: string;
  isActive: boolean;
  joinedAt: Date;
  roles: string[];
}

// --- Adaptee A: the legacy v1 API. snake_case, numeric booleans, nulls. ---
interface V1Payload {
  user_id: number;
  first_name: string;
  last_name: string | null;
  email_address: string;
  is_act: 0 | 1;
  created: string;
  role_csv: string | null;
}

// --- Adaptee B: the newer v2 API. Different again. ---
interface V2Payload {
  id: string;
  name: { given: string; family?: string };
  contact: { email: string };
  status: "active" | "suspended" | "pending";
  createdAt: string;
  roles?: string[];
}

export interface UserAdapter<TRaw> {
  toViewModel(raw: TRaw): UserViewModel;
}

const initialsOf = (full: string): string =>
  full
    .split(" ")
    .filter((p: string): boolean => p !== "")
    .slice(0, 2)
    .map((p: string): string => p[0].toUpperCase())
    .join("");

class V1UserAdapter implements UserAdapter<V1Payload> {
  public toViewModel(raw: V1Payload): UserViewModel {
    const fullName: string = [raw.first_name, raw.last_name ?? ""].join(" ").trim();
    return {
      id: String(raw.user_id), // number -> string, so ids are uniform
      fullName,
      initials: initialsOf(fullName),
      email: raw.email_address,
      isActive: raw.is_act === 1, // numeric boolean -> real boolean
      joinedAt: new Date(raw.created), // string -> Date
      roles: raw.role_csv?.split(",").filter((r: string): boolean => r !== "") ?? [], // null -> []
    };
  }
}

class V2UserAdapter implements UserAdapter<V2Payload> {
  public toViewModel(raw: V2Payload): UserViewModel {
    const fullName: string = [raw.name.given, raw.name.family ?? ""].join(" ").trim();
    return {
      id: raw.id,
      fullName,
      initials: initialsOf(fullName),
      email: raw.contact.email,
      isActive: raw.status === "active",
      joinedAt: new Date(raw.createdAt),
      roles: raw.roles ?? [],
    };
  }
}

// Components only ever see the view model.
function UserBadge(user: UserViewModel): string {
  const dot: string = user.isActive ? "\u25cf" : "\u25cb";
  return `${dot} [${user.initials}] ${user.fullName} <${user.email}> roles=[${user.roles.join(", ")}] since ${user.joinedAt.getFullYear()}`;
}

// ---- Demo ----

const v1: V1Payload = {
  user_id: 42,
  first_name: "Ada",
  last_name: "Lovelace",
  email_address: "ada@example.com",
  is_act: 1,
  created: "2029-03-14T00:00:00Z",
  role_csv: "admin,editor",
};

const v2: V2Payload = {
  id: "usr_88",
  name: { given: "Grace" },
  contact: { email: "grace@example.com" },
  status: "suspended",
  createdAt: "2031-07-02T00:00:00Z",
};

console.log(UserBadge(new V1UserAdapter().toViewModel(v1)));
console.log(UserBadge(new V2UserAdapter().toViewModel(v2)));

// Both sources can feed the same list component during a migration.
const everyone: UserViewModel[] = [new V1UserAdapter().toViewModel(v1), new V2UserAdapter().toViewModel(v2)];
console.log("\nactive users:", everyone.filter((u: UserViewModel): boolean => u.isActive).map((u) => u.fullName));
