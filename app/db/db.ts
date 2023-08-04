import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { userProjectsRelation, users } from "./schema/users";
import { config } from "~/config";
import { projects, projectOwnerRelation } from "./schema/projects";
import { clients, clientsUserRelation } from "./schema/clients";

const client = postgres(config.db.connectionString);

export const db = drizzle(client, {
  schema: {
    users,
    projects,
    clients,
    projectOwnerRelation,
    userProjectsRelation,
    clientsUserRelation,
  },
});
