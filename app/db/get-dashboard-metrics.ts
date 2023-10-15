import { prisma } from "./prisma-client";

export type DashboardMetrics = Awaited<ReturnType<typeof getDashboardMetrics>>;

export async function getDashboardMetrics(userId: string) {
  const [
    projectsCount,
    ongoingProjectsCount,
    completedProjectsCount,
    clientsCount,
  ] = await Promise.all([
    prisma.project.count({ where: { ownerId: userId } }),
    prisma.project.count({ where: { ownerId: userId, endedAt: null } }),
    prisma.project.count({
      where: { ownerId: userId, endedAt: { not: null } },
    }),
    prisma.client.count({ where: { userId } }),
  ]);

  return {
    projectsCount,
    clientsCount,
    completedProjectsCount,
    ongoingProjectsCount,
  };
}
