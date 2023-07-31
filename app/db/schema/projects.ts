import { type InferModel, relations } from "drizzle-orm";
import { timestamp, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("userId").notNull(),
  startedAt: timestamp("startedAt").notNull(),
  endedAt: timestamp("endedAt"),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  deletedAt: timestamp("deletedAt"),
});

export const projectOwnerRelation = relations(projects, ({ one }) => ({
  ownerId: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export type Project = InferModel<typeof projects, "select">;
export type InsertProject = InferModel<typeof projects, "insert">;
