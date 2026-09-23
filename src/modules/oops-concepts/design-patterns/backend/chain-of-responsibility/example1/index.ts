// Chain of Responsibility — Example 1: an HTTP middleware pipeline.
// The "pipeline" flavour: every handler runs unless one short-circuits.

export interface Request {
  path: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
  user?: string;
}

export interface Response {
  status: number;
  body: string;
}

export abstract class Middleware {
  private next?: Middleware;

  // Returning `next` lets the chain be built fluently.
  public setNext(next: Middleware): Middleware {
    this.next = next;
    return next;
  }

  public abstract handle(req: Request): Response;

  // Called by a handler that wants to continue down the chain.
  protected forward(req: Request): Response {
    if (this.next === undefined) {
      return { status: 404, body: "no handler matched" };
    }
    return this.next.handle(req);
  }
}

class AuthMiddleware extends Middleware {
  public handle(req: Request): Response {
    const token: string | undefined = req.headers.authorization;
    if (token !== "Bearer valid") {
      console.log("  [auth] rejected");
      return { status: 401, body: "unauthorized" }; // short-circuits the chain
    }
    req.user = "ada"; // handlers may enrich the request for those downstream
    console.log("  [auth] ok, user=ada");
    return this.forward(req);
  }
}

class RateLimitMiddleware extends Middleware {
  private readonly hits: Map<string, number> = new Map<string, number>();

  constructor(private readonly limit: number) {
    super();
  }

  public handle(req: Request): Response {
    const user: string = req.user ?? "anonymous";
    const count: number = (this.hits.get(user) ?? 0) + 1;
    this.hits.set(user, count);

    if (count > this.limit) {
      console.log(`  [rate-limit] ${user} exceeded ${this.limit} requests`);
      return { status: 429, body: "too many requests" };
    }
    console.log(`  [rate-limit] ${user} ${count}/${this.limit}`);
    return this.forward(req);
  }
}

class ValidationMiddleware extends Middleware {
  public handle(req: Request): Response {
    if (req.body.email === undefined) {
      console.log("  [validate] missing email");
      return { status: 422, body: "email is required" };
    }
    console.log("  [validate] ok");
    return this.forward(req);
  }
}

class RouteHandler extends Middleware {
  public handle(req: Request): Response {
    console.log("  [handler] creating the resource");
    return { status: 201, body: `created ${req.body.email} for ${req.user}` };
  }
}

// ---- Demo ----

// Order matters, and it is decided here in the wiring, not inside the handlers.
const auth: Middleware = new AuthMiddleware();
auth.setNext(new RateLimitMiddleware(2)).setNext(new ValidationMiddleware()).setNext(new RouteHandler());

const send = (label: string, req: Request): void => {
  console.log(label);
  console.log("  =>", auth.handle(req));
};

send("valid request:", {
  path: "/users",
  headers: { authorization: "Bearer valid" },
  body: { email: "ada@example.com" },
});

send("no token:", { path: "/users", headers: {}, body: { email: "x@example.com" } });

send("missing email:", { path: "/users", headers: { authorization: "Bearer valid" }, body: {} });

send("third request from ada (over the limit):", {
  path: "/users",
  headers: { authorization: "Bearer valid" },
  body: { email: "grace@example.com" },
});
