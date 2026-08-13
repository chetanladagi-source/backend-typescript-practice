// Consumer that relies on the documented null result.

import { User } from "./user";
import { UserRepository } from "./user-repository";

export function describeUser(repository: UserRepository, id: string): string {
  const user: User | null = repository.findById(id);
  return user === null ? `${id} -> guest (${repository.source})` : `${id} -> ${user.email} (${repository.source})`;
}
