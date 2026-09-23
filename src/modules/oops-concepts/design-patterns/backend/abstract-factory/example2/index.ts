// Abstract Factory — Example 2: a persistence kit.
// A Mongo repository cannot run on a Postgres connection, so they ship as a pair.

export interface Connection {
  execute(command: string): string;
}

export interface UserRepository {
  findById(id: string): string;
  save(id: string, email: string): string;
}

// --- Postgres family ---

class PostgresConnection implements Connection {
  public execute(command: string): string {
    return `[pg] ${command}`;
  }
}

class PostgresUserRepository implements UserRepository {
  constructor(private readonly conn: Connection) {}

  public findById(id: string): string {
    return this.conn.execute(`SELECT * FROM users WHERE id = '${id}'`);
  }

  public save(id: string, email: string): string {
    return this.conn.execute(`INSERT INTO users VALUES ('${id}', '${email}')`);
  }
}

// --- Mongo family ---

class MongoConnection implements Connection {
  public execute(command: string): string {
    return `[mongo] ${command}`;
  }
}

class MongoUserRepository implements UserRepository {
  constructor(private readonly conn: Connection) {}

  public findById(id: string): string {
    return this.conn.execute(`db.users.findOne(${JSON.stringify({ _id: id })})`);
  }

  public save(id: string, email: string): string {
    return this.conn.execute(`db.users.insertOne(${JSON.stringify({ _id: id, email })})`);
  }
}

export interface PersistenceFactory {
  createConnection(): Connection;
  createUserRepository(conn: Connection): UserRepository;
}

class PostgresFactory implements PersistenceFactory {
  public createConnection(): Connection {
    return new PostgresConnection();
  }
  public createUserRepository(conn: Connection): UserRepository {
    return new PostgresUserRepository(conn);
  }
}

class MongoFactory implements PersistenceFactory {
  public createConnection(): Connection {
    return new MongoConnection();
  }
  public createUserRepository(conn: Connection): UserRepository {
    return new MongoUserRepository(conn);
  }
}

// Service layer: same code for either engine.
class UserService {
  private readonly repo: UserRepository;

  constructor(factory: PersistenceFactory) {
    this.repo = factory.createUserRepository(factory.createConnection());
  }

  public register(id: string, email: string): void {
    console.log(this.repo.save(id, email));
    console.log(this.repo.findById(id));
  }
}

// ---- Demo ----

console.log("--- postgres ---");
new UserService(new PostgresFactory()).register("u1", "ada@example.com");

console.log("--- mongo ---");
new UserService(new MongoFactory()).register("u1", "ada@example.com");
