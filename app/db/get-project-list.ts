import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import { projects } from "./schema/projects";
import { clients } from "./schema/clients";

export type ProjectList = Awaited<typeof getProjectList>;

export async function getProjectList(userId: string) {
  const result = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      client: {
        name: clients.name,
      },
    })
    .from(projects)
    .where(eq(projects.userId, userId))
    .innerJoin(clients, eq(projects.clientId, clients.id))
    .orderBy(desc(projects.createdAt));

  return result.flatMap((p) => p);
}
