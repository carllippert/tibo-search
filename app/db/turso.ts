import { createClient } from "@libsql/client";

export const dbClient = createClient({
  url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
  syncUrl: process.env.NEXT_PUBLIC_TURSO_DATABASE_SYNC_URL!,
  authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!,
});

