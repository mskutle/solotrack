import { relations, type InferModel } from "drizzle-orm";
import { timestamp, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  photoUrl: text("photoUrl").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt"),
});

export const userProjectsRelation = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export type User = InferModel<typeof users, "select">;
export type InsertUser = InferModel<typeof users, "insert">;
