import { prisma } from "./prisma-client";

export type GetProjectById = Awaited<ReturnType<typeof getProjectById>>;

export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}
