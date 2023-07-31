import type { Config } from "drizzle-kit";
import { config } from "~/config";

export default {
  schema: "./app/db/schema",
  driver: "pg",
  dbCredentials: { connectionString: config.db.connectionString },
  out: "./app/db/migrations",
} satisfies Config;
