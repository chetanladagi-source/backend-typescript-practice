// Template Method (frontend) — Example 2: the same pattern WITHOUT inheritance.
// The fixed submit sequence lives in one function; the varying steps arrive as a config object.
// This is how react-hook-form, Formik and TanStack Query actually ship template methods.

type Values = Record<string, string>;
type Errors = Record<string, string>;

export interface SubmitFlow<TResponse> {
  readonly name: string;
  // Required steps.
  validate(values: Values): Errors;
  send(payload: Values): TResponse;
  // Optional hooks, exactly like the protected methods of a base class.
  transform?(values: Values): Values;
  onSuccess?(response: TResponse): void;
  onError?(message: string): void;
}

// THE TEMPLATE METHOD. The sequence is fixed for every form in the app.
function submit<TResponse>(flow: SubmitFlow<TResponse>, values: Values): void {
  console.log(`\nsubmit ${flow.name}`);

  const errors: Errors = flow.validate(values);
  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([field, message]: [string, string]): void => {
      console.log(`  invalid ${field}: ${message}`);
    });
    console.log("  (not sent — focusing the first invalid field)");
    return;
  }

  const payload: Values = flow.transform?.(values) ?? values;
  console.log(`  sending ${JSON.stringify(payload)}`);

  try {
    const response: TResponse = flow.send(payload);
    if (flow.onSuccess !== undefined) {
      flow.onSuccess(response);
    } else {
      console.log("  saved");
    }
  } catch (err) {
    const message: string = (err as Error).message;
    if (flow.onError !== undefined) {
      flow.onError(message);
    } else {
      console.log(`  showing generic toast: ${message}`);
    }
  }
}

const signupFlow: SubmitFlow<{ id: string }> = {
  name: "signup",
  validate: (v: Values): Errors => {
    const errors: Errors = {};
    if (!(v.email ?? "").includes("@")) {
      errors.email = "enter a valid email";
    }
    if ((v.password ?? "").length < 8) {
      errors.password = "at least 8 characters";
    }
    return errors;
  },
  // Normalise before sending: trim and lowercase the email, drop the confirmation field.
  transform: (v: Values): Values => ({
    email: (v.email ?? "").trim().toLowerCase(),
    password: v.password ?? "",
  }),
  send: (): { id: string } => ({ id: "u-42" }),
  onSuccess: (r: { id: string }): void => console.log(`  account ${r.id} created — redirecting to /welcome`),
};

// A minimal flow: two required steps, no hooks. It still gets the full sequence.
const feedbackFlow: SubmitFlow<void> = {
  name: "feedback",
  validate: (v: Values): Errors => ((v.message ?? "").length === 0 ? { message: "say something" } : {}),
  send: (): void => {
    throw new Error("503 service unavailable");
  },
};

// ---- Demo ----

submit(signupFlow, { email: " ADA@Example.com ", password: "short" });
submit(signupFlow, { email: " ADA@Example.com ", password: "correct-horse" });
submit(feedbackFlow, { message: "" });
submit(feedbackFlow, { message: "the checkout button is hard to find" });
