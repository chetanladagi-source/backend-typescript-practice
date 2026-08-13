// Domain entity shared by every repository implementation.

export interface User {
  readonly id: string;
  readonly email: string;
}
