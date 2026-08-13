// Contract stated once: a missing id is null, never an exception.

import { User } from "./user";

export interface UserRepository {
  readonly source: string;
  findById(id: string): User | null;
}
