import { relations, type InferModel } from "drizzle-orm";
import { timestamp, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt"),
});

export const clientsUserRelation = relations(clients, ({ one }) => ({
  ownerId: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
}));

export type Client = InferModel<typeof clients, "select">;
export type InsertClient = InferModel<typeof clients, "insert">;
