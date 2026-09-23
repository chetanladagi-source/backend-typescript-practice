// Iterator — Example 2: paginating an API lazily.
// The caller writes a simple for...of and never sees a page boundary.

export interface ApiUser {
  id: number;
  name: string;
}

// Stands in for a real HTTP API with 23 users across pages of 10.
class UserApi {
  private static readonly total: number = 23;
  public requests: number = 0;

  public fetchPage(page: number, size: number): { users: ApiUser[]; hasMore: boolean } {
    this.requests++;
    console.log(`  [http] GET /users?page=${page}&size=${size}`);
    const start: number = (page - 1) * size;
    const users: ApiUser[] = Array.from(
      { length: Math.max(0, Math.min(size, UserApi.total - start)) },
      (_: unknown, i: number): ApiUser => ({ id: start + i + 1, name: `user-${start + i + 1}` }),
    );
    return { users, hasMore: start + users.length < UserApi.total };
  }
}

// The iterator hides pagination entirely and only fetches when asked.
class PaginatedUsers implements Iterable<ApiUser> {
  constructor(private readonly api: UserApi, private readonly pageSize: number = 10) {}

  public [Symbol.iterator](): Iterator<ApiUser> {
    const api: UserApi = this.api;
    const size: number = this.pageSize;

    let buffer: ApiUser[] = [];
    let cursor: number = 0;
    let page: number = 0;
    let exhausted: boolean = false;

    return {
      next(): IteratorResult<ApiUser> {
        if (cursor >= buffer.length) {
          if (exhausted) {
            return { value: undefined, done: true };
          }
          page++;
          const result = api.fetchPage(page, size);
          buffer = result.users;
          cursor = 0;
          exhausted = !result.hasMore;
          if (buffer.length === 0) {
            return { value: undefined, done: true };
          }
        }
        return { value: buffer[cursor++], done: false };
      },
    };
  }
}

// ---- Demo ----

console.log("--- consuming everything ---");
const api: UserApi = new UserApi();
const names: string[] = [];
for (const user of new PaginatedUsers(api, 10)) {
  names.push(user.name);
}
console.log(`got ${names.length} users in ${api.requests} HTTP requests`);

console.log("--- early exit after 3 users (laziness pays off) ---");
const api2: UserApi = new UserApi();
const firstThree: ApiUser[] = [];
for (const user of new PaginatedUsers(api2, 10)) {
  firstThree.push(user);
  if (firstThree.length === 3) {
    break;
  }
}
console.log(
  `got ${firstThree.map((u: ApiUser): string => u.name).join(", ")} in only ${api2.requests} HTTP request`,
);
