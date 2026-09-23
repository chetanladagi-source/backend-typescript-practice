// Chain of Responsibility — Example 3: support ticket triage.
// Handlers match on content rather than on a numeric threshold, and a
// catch-all guarantees nothing is ever silently dropped.

export interface Ticket {
  id: string;
  subject: string;
  tags: string[];
  customerTier: "free" | "pro" | "enterprise";
}

export type TicketHandler = (ticket: Ticket, next: () => string) => string;

// A tiny chain runner: composes handlers into a single callable.
function buildChain(handlers: TicketHandler[]): (ticket: Ticket) => string {
  return (ticket: Ticket): string => {
    const step = (index: number): string => {
      if (index >= handlers.length) {
        return "unrouted";
      }
      return handlers[index](ticket, (): string => step(index + 1));
    };
    return step(0);
  };
}

// --- Handlers, each deciding whether this ticket is theirs ---

const securityHandler: TicketHandler = (ticket, next) => {
  if (ticket.tags.includes("security")) {
    return `security team (paged immediately) — ${ticket.id}`;
  }
  return next();
};

const enterpriseHandler: TicketHandler = (ticket, next) => {
  if (ticket.customerTier === "enterprise") {
    return `named account manager — ${ticket.id}`;
  }
  return next();
};

const billingHandler: TicketHandler = (ticket, next) => {
  if (ticket.tags.includes("billing") || /invoice|refund|charge/i.test(ticket.subject)) {
    return `billing team — ${ticket.id}`;
  }
  return next();
};

const bugHandler: TicketHandler = (ticket, next) => {
  if (ticket.tags.includes("bug")) {
    return `engineering backlog — ${ticket.id}`;
  }
  return next();
};

// Catch-all: the explicit answer to "what if nothing matches?"
const fallbackHandler: TicketHandler = (ticket) => `general support queue — ${ticket.id}`;

// ---- Demo ----

// Order encodes priority: security beats enterprise beats everything else.
const triage = buildChain([securityHandler, enterpriseHandler, billingHandler, bugHandler, fallbackHandler]);

const tickets: Ticket[] = [
  { id: "T-1", subject: "Possible data leak in export", tags: ["security"], customerTier: "free" },
  { id: "T-2", subject: "Cannot log in", tags: [], customerTier: "enterprise" },
  { id: "T-3", subject: "Refund for duplicate charge", tags: [], customerTier: "pro" },
  { id: "T-4", subject: "Export button does nothing", tags: ["bug"], customerTier: "pro" },
  { id: "T-5", subject: "How do I rename my team?", tags: [], customerTier: "free" },
];

tickets.forEach((t: Ticket): void => console.log(`${t.subject}\n  -> ${triage(t)}`));

// Reordering the chain changes policy without touching any handler.
console.log("\n--- enterprise prioritised above security ---");
const vipFirst = buildChain([enterpriseHandler, securityHandler, fallbackHandler]);
console.log(vipFirst({ id: "T-6", subject: "Suspicious login", tags: ["security"], customerTier: "enterprise" }));
