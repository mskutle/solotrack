import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./db";

migrate(db, { migrationsFolder: "./app/db/migrations" }).catch(console.error);
