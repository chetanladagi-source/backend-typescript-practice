// Singleton — Example 2: a database connection pool.
// Two pools would open twice the connections and blow the server's limit, so the
// "one instance" rule here is a correctness requirement, not an optimisation.

export class ConnectionPool {
  private static instance: ConnectionPool | undefined;

  private readonly maxConnections: number = 5;
  private inUse: number = 0;
  private queryCount: number = 0;

  private constructor() {
    console.log(`[pool] opening ${this.maxConnections} connections`);
  }

  public static getInstance(): ConnectionPool {
    if (ConnectionPool.instance === undefined) {
      ConnectionPool.instance = new ConnectionPool();
    }
    return ConnectionPool.instance;
  }

  public query(sql: string): string {
    if (this.inUse >= this.maxConnections) {
      return `[pool] rejected, all ${this.maxConnections} connections busy`;
    }
    this.inUse++;
    this.queryCount++;
    const result: string = `[pool] ran "${sql}" (connection ${this.inUse})`;
    this.inUse--;
    return result;
  }

  public stats(): string {
    return `queries=${this.queryCount} max=${this.maxConnections}`;
  }

  // Escape hatch for tests: without this, state leaks between test cases.
  public static reset(): void {
    ConnectionPool.instance = undefined;
  }
}

// ---- Demo ----

// Different layers of the app, same pool underneath.
const userRepoPool: ConnectionPool = ConnectionPool.getInstance();
const orderRepoPool: ConnectionPool = ConnectionPool.getInstance();

console.log(userRepoPool.query("SELECT * FROM users"));
console.log(orderRepoPool.query("SELECT * FROM orders"));

console.log("shared pool?", userRepoPool === orderRepoPool); // true
console.log("stats:", userRepoPool.stats()); // counts both queries

ConnectionPool.reset();
console.log("after reset, new pool?", ConnectionPool.getInstance() !== userRepoPool); // true
