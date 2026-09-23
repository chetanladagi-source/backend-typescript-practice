// Builder — Example 2: a SQL SELECT builder.
// The classic case: clause order in the output is fixed, but callers add them in any order.

export class QueryBuilder {
  private table: string = "";
  private columns: string[] = ["*"];
  private wheres: string[] = [];
  private params: unknown[] = [];
  private orderByClause: string = "";
  private limitCount?: number;

  public select(...columns: string[]): this {
    this.columns = columns.length > 0 ? columns : ["*"];
    return this;
  }

  public from(table: string): this {
    this.table = table;
    return this;
  }

  // Values are collected separately so the output is parameterised, not string-concatenated.
  public where(condition: string, value: unknown): this {
    this.params.push(value);
    this.wheres.push(`${condition} $${this.params.length}`);
    return this;
  }

  public orderBy(column: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.orderByClause = `${column} ${direction}`;
    return this;
  }

  public limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  public build(): { sql: string; params: unknown[] } {
    if (this.table === "") {
      throw new Error("from() is required");
    }
    // The builder, not the caller, is responsible for correct clause ordering.
    let sql: string = `SELECT ${this.columns.join(", ")} FROM ${this.table}`;
    if (this.wheres.length > 0) {
      sql += ` WHERE ${this.wheres.join(" AND ")}`;
    }
    if (this.orderByClause !== "") {
      sql += ` ORDER BY ${this.orderByClause}`;
    }
    if (this.limitCount !== undefined) {
      sql += ` LIMIT ${this.limitCount}`;
    }
    return { sql, params: [...this.params] };
  }
}

// ---- Demo ----

const activeAdmins = new QueryBuilder()
  .select("id", "email", "created_at")
  .from("users")
  .where("role =", "admin")
  .where("is_active =", true)
  .orderBy("created_at", "DESC")
  .limit(10)
  .build();

console.log(activeAdmins.sql);
console.log("params:", activeAdmins.params);

// Note the caller listed limit() before where(); the output clause order is still valid SQL.
const recentOrders = new QueryBuilder().from("orders").limit(5).where("total >", 1000).build();

console.log(recentOrders.sql);
console.log("params:", recentOrders.params);
