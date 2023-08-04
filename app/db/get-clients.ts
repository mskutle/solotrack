import { desc, eq } from "drizzle-orm";
import { db } from "./db";
import { clients } from "./schema/clients";

export async function getClients(userId: string) {
  return db
    .select()
    .from(clients)
    .where(eq(clients.userId, userId))
    .orderBy(desc(clients.createdAt));
}
