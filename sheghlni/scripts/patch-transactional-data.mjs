import fs from "fs";

const path = "src/lib/mock/transactional-data.ts";
let s = fs.readFileSync(path, "utf8");

s = s.replaceAll('status: "sent"', 'status: "pending"');

s = s.replace(
  /import type \{\n  Booking,/,
  'import type {\n  Booking,\n  ServiceAddress,',
);

if (!s.includes("function addr(")) {
  s = s.replace(
    'import { DEMO_USER_ID } from "./constants";\n',
    `import { DEMO_USER_ID } from "./constants";

function addr(
  line1: string,
  city: string,
  region: string,
  postal: string,
): ServiceAddress {
  return { line1, city, region, postal, country: "US" };
}

function bookingFees(subtotalCents: number, taxCents: number) {
  const platformFeeCents = Math.round(subtotalCents * 0.12);
  return {
    subtotalCents,
    platformFeeCents,
    taxCents,
    totalCents: subtotalCents + platformFeeCents + taxCents,
  };
}

`,
  );
}

// Quote line items
s = s.replaceAll(
  `        description: "Wedding Day Coverage (8 hrs) — June 14, 2026",
        quantity: 1,
        unitPriceCents: 350000,
        totalCents: 350000,
      },`,
  `        description: "Wedding Day Coverage (8 hrs) — June 14, 2026",
        unit: "project",
        quantity: 1,
        unitPriceCents: 350000,
        totalCents: 350000,
        sortOrder: 0,
      },`,
);

s = s.replaceAll(
  `        description: "EV Charger Installation — Tesla Wall Connector",
        quantity: 1,
        unitPriceCents: 95000,
        totalCents: 95000,
      },`,
  `        description: "EV Charger Installation — Tesla Wall Connector",
        unit: "project",
        quantity: 1,
        unitPriceCents: 95000,
        totalCents: 95000,
        sortOrder: 0,
      },`,
);

s = s.replaceAll(
  `        description: "8-Session Personal Training Package",
        quantity: 1,
        unitPriceCents: 68000,
        totalCents: 68000,
      },`,
  `        description: "8-Session Personal Training Package",
        unit: "project",
        quantity: 1,
        unitPriceCents: 68000,
        totalCents: 68000,
        sortOrder: 0,
      },`,
);

if (!s.includes("createdAt: \"2026-05-22T16:42:00.000Z\",\n  },")) {
  s = s.replace(
    /expiresAt: "2026-06-01T23:59:59.000Z",\n  \},/,
    `expiresAt: "2026-06-01T23:59:59.000Z",
    createdAt: "2026-05-22T16:42:00.000Z",
  },`,
  );
  s = s.replace(
    /expiresAt: "2026-05-30T23:59:59.000Z",\n  \},/,
    `expiresAt: "2026-05-30T23:59:59.000Z",
    createdAt: "2026-05-21T11:15:00.000Z",
  },`,
  );
  s = s.replace(
    /expiresAt: "2026-05-15T23:59:59.000Z",\n  \},/,
    `expiresAt: "2026-05-15T23:59:59.000Z",
    createdAt: "2026-05-18T09:00:00.000Z",
  },`,
  );
}

// Conversations
if (!s.includes("providerUnreadCount")) {
  s = s.replaceAll(
    "customerUnreadCount: 1,\n    status:",
    "customerUnreadCount: 1,\n    providerUnreadCount: 0,\n    createdAt: \"2026-05-20T09:00:00.000Z\",\n    status:",
  );
  s = s.replaceAll(
    "customerUnreadCount: 0,\n    status:",
    "customerUnreadCount: 0,\n    providerUnreadCount: 0,\n    createdAt: \"2026-05-01T09:00:00.000Z\",\n    status:",
  );
  s = s.replaceAll(
    "customerUnreadCount: 2,\n    status:",
    "customerUnreadCount: 2,\n    providerUnreadCount: 0,\n    createdAt: \"2026-05-15T08:00:00.000Z\",\n    status:",
  );
}

// Messages readAt
if (!s.includes("readAt:")) {
  s = s.replaceAll(
    "bookingId: null,\n    createdAt:",
    "bookingId: null,\n    readAt: null,\n    createdAt:",
  );
}

// Bookings - replace string addresses with structured + fees
const bookingPatches = [
  {
    old: `serviceAddress: "2100 Barton Springs Rd, Austin, TX 78704",
    startsAt: "2026-05-27T12:00:00.000Z",
    endsAt: "2026-05-27T13:00:00.000Z",
    status: "confirmed",
    totalCents: 73780,
    currency: "USD",`,
    subtotal: 68000,
    tax: 5780,
    created: "2026-05-18T09:00:00.000Z",
    addr: `addr("2100 Barton Springs Rd", "Austin", "TX", "78704")`,
  },
  {
    old: `serviceAddress: "45 Beacon St, Boston, MA 02108",
    startsAt: "2026-05-29T15:00:00.000Z",
    endsAt: "2026-05-29T17:00:00.000Z",
    status: "confirmed",
    totalCents: 17000,
    currency: "USD",`,
    subtotal: 15000,
    tax: 0,
    created: "2026-05-19T16:00:00.000Z",
    addr: `addr("45 Beacon St", "Boston", "MA", "02108")`,
  },
  {
    old: `serviceAddress: "742 Evergreen Terrace, Chicago, IL 60614",
    startsAt: "2026-04-28T09:00:00.000Z",
    endsAt: "2026-04-28T15:00:00.000Z",
    status: "completed",
    totalCents: 35000,
    currency: "USD",`,
    subtotal: 30000,
    tax: 2550,
    created: "2026-04-20T10:00:00.000Z",
    addr: `addr("742 Evergreen Terrace", "Chicago", "IL", "60614")`,
  },
  {
    old: `serviceAddress: "1806 South Congress Ave, Austin, TX 78704",
    startsAt: "2026-04-10T14:00:00.000Z",
    endsAt: "2026-04-10T15:30:00.000Z",
    status: "completed",
    totalCents: 8500,
    currency: "USD",`,
    subtotal: 7500,
    tax: 638,
    created: "2026-04-01T12:00:00.000Z",
    addr: `addr("1806 South Congress Ave", "Austin", "TX", "78704")`,
  },
  {
    old: `serviceAddress: "88 Cambridge St, Boston, MA 02114",
    startsAt: "2026-02-20T10:00:00.000Z",
    endsAt: "2026-02-20T13:00:00.000Z",
    status: "completed",
    totalCents: 22000,
    currency: "USD",`,
    subtotal: 19500,
    tax: 1658,
    created: "2026-02-10T09:00:00.000Z",
    addr: `addr("88 Cambridge St", "Boston", "MA", "02114")`,
  },
  {
    old: `serviceAddress: "15 Brattle St, Cambridge, MA 02138",
    startsAt: "2026-01-08T22:00:00.000Z",
    endsAt: "2026-01-08T23:00:00.000Z",
    status: "completed",
    totalCents: 544000,
    currency: "USD",`,
    subtotal: 68000,
    tax: 5780,
    created: "2025-12-01T10:00:00.000Z",
    addr: `addr("15 Brattle St", "Cambridge", "MA", "02138")`,
  },
  {
    old: `serviceAddress: "1200 Barton Creek Blvd, Austin, TX 78735",
    startsAt: "2026-06-05T16:00:00.000Z",
    endsAt: "2026-06-05T20:00:00.000Z",
    status: "cancelled",
    totalCents: 180000,
    currency: "USD",`,
    subtotal: 180000,
    tax: 15300,
    created: "2026-04-15T11:00:00.000Z",
    addr: `addr("1200 Barton Creek Blvd", "Austin", "TX", "78735")`,
  },
  {
    old: `serviceAddress: "2200 N Halsted St, Chicago, IL 60614",
    startsAt: "2026-03-01T14:00:00.000Z",
    endsAt: "2026-03-03T18:00:00.000Z",
    status: "disputed",
    totalCents: 125000,
    currency: "USD",`,
    subtotal: 110000,
    tax: 9350,
    created: "2026-02-20T14:00:00.000Z",
    addr: `addr("2200 N Halsted St", "Chicago", "IL", "60614")`,
  },
];

for (const patch of bookingPatches) {
  const fees = `(function(){const f=bookingFees(${patch.subtotal}, ${patch.tax});return f;})()`;
  // simpler inline
  const platform = Math.round(patch.subtotal * 0.12);
  const total = patch.subtotal + platform + patch.tax;
  const replacement = `serviceAddress: ${patch.addr},
    startsAt: ${patch.old.match(/startsAt: "[^"]+"/)[0]},
    endsAt: ${patch.old.match(/endsAt: "[^"]+"/)[0]},
    status: ${patch.old.match(/status: "[^"]+"/)[0]},
    currency: "USD",
    subtotalCents: ${patch.subtotal},
    platformFeeCents: ${platform},
    taxCents: ${patch.tax},
    totalCents: ${total},
    createdAt: "${patch.created}",`;
  s = s.replace(patch.old, replacement);
}

fs.writeFileSync(path, s);
console.log("transactional-data.ts patched");
