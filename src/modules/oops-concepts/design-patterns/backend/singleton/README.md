# Singleton (Creational)

**Intent:** guarantee a class has exactly one instance and give the whole app one global access
point to it.

## How it works

1. Make the constructor `private` so nobody can `new` it.
2. Keep the one instance in a `private static` field.
3. Expose a `static getInstance()` that lazily creates it on first call and returns the same
   object every time after.

## When to use

- Something genuinely expensive or stateful that must be shared: a connection pool, a config
  object read once at boot, a metrics registry, a logger.
- When two copies would be a correctness bug, not just a waste (two pools = double the
  connections; two config objects = drifting values).

## When NOT to use

- Just to avoid passing a dependency around. That is global state wearing a costume.
- Anything you want to swap in tests. Singletons are hard to mock and leak state between test
  cases because the instance survives the whole process.
- Prefer plain dependency injection: create one instance at the composition root and pass it
  down. You get "one instance" without the global.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | App config loaded once from the environment |
| `example2` | Database connection pool shared by every request |
| `example3` | Application logger with a shared buffer |

## Interview questions

- **How do you make it thread-safe?** In Java/C# you need double-checked locking or a static
  initialiser. In Node it is a non-issue for sync code because JavaScript is single-threaded —
  but an `async` factory can still be entered twice before the first `await` resolves, so you
  cache the *promise*, not the result.
- **Module singleton vs class singleton?** In Node, a module is already cached by `require`/
  `import`, so `export const config = new Config()` is a singleton. The class form is worth it
  when you need lazy creation or an explicit reset hook.
- **Why is it called an anti-pattern?** Hidden global state, implicit coupling (you cannot see
  the dependency in the constructor), and painful testing.
- **How do you test code that uses one?** Add a `static reset()` for tests, or better, inject the
  instance as a constructor parameter and let the singleton only live at the composition root.
