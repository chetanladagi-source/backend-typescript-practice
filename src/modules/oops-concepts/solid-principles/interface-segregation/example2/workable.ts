// The single capability every worker shares.

export interface Workable {
  work(task: string): void;
}
