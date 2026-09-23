// Template Method — Example 3: the HTTP request lifecycle.
// Every controller follows validate -> authorize -> execute -> respond.

export interface HttpRequest {
  body: Record<string, unknown>;
  user?: { id: string; roles: string[] };
}

export interface HttpResponse {
  status: number;
  body: unknown;
}

export abstract class Controller {
  // Template method: the lifecycle every endpoint shares, including error handling.
  public handle(req: HttpRequest): HttpResponse {
    try {
      const problem: string | undefined = this.validate(req);
      if (problem !== undefined) {
        return { status: 422, body: { error: problem } };
      }

      if (!this.authorize(req)) {
        return { status: 403, body: { error: "forbidden" } };
      }

      return { status: this.successStatus(), body: this.execute(req) };
    } catch (err) {
      // One place to keep unexpected errors from leaking internals.
      console.log(`  [error] ${(err as Error).message}`);
      return { status: 500, body: { error: "internal server error" } };
    }
  }

  protected abstract execute(req: HttpRequest): unknown;

  // Hooks with safe defaults.
  protected validate(_req: HttpRequest): string | undefined {
    return undefined;
  }

  protected authorize(req: HttpRequest): boolean {
    return req.user !== undefined; // default: any logged-in user
  }

  protected successStatus(): number {
    return 200;
  }
}

class GetProfileController extends Controller {
  protected execute(req: HttpRequest): unknown {
    return { id: req.user?.id, name: "Ada" };
  }
}

class CreateUserController extends Controller {
  protected validate(req: HttpRequest): string | undefined {
    return typeof req.body.email === "string" ? undefined : "email is required";
  }

  protected authorize(req: HttpRequest): boolean {
    return req.user?.roles.includes("admin") ?? false;
  }

  protected successStatus(): number {
    return 201;
  }

  protected execute(req: HttpRequest): unknown {
    return { id: "u9", email: req.body.email };
  }
}

class HealthController extends Controller {
  // Public endpoint: opt out of the auth default.
  protected authorize(): boolean {
    return true;
  }

  protected execute(): unknown {
    return { status: "ok" };
  }
}

class BrokenController extends Controller {
  protected authorize(): boolean {
    return true;
  }
  protected execute(): unknown {
    throw new Error("database connection lost");
  }
}

// ---- Demo ----

const admin: HttpRequest["user"] = { id: "u1", roles: ["admin"] };
const member: HttpRequest["user"] = { id: "u2", roles: ["member"] };

const cases: [string, Controller, HttpRequest][] = [
  ["GET /health (anonymous)", new HealthController(), { body: {} }],
  ["GET /profile (logged in)", new GetProfileController(), { body: {}, user: member }],
  ["GET /profile (anonymous)", new GetProfileController(), { body: {} }],
  ["POST /users (admin, valid)", new CreateUserController(), { body: { email: "x@y.com" }, user: admin }],
  ["POST /users (admin, no email)", new CreateUserController(), { body: {}, user: admin }],
  ["POST /users (member)", new CreateUserController(), { body: { email: "x@y.com" }, user: member }],
  ["GET /boom", new BrokenController(), { body: {} }],
];

cases.forEach(([label, controller, req]: [string, Controller, HttpRequest]): void => {
  console.log(`${label}\n  =>`, controller.handle(req));
});
