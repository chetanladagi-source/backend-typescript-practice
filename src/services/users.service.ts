import { users } from "../data/users";

export function getUsers(page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: users.slice(start, end),
    page,
    limit,
    total: users.length,
    hasMore: end < users.length,
  };
}
