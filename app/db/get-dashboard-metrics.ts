import {prisma} from "./prisma-client";

export type DashboardMetrics = Awaited<ReturnType<typeof getMetrics>>;

export async function getMetrics(teamId: string) {
  const [
    projectsCount,
    ongoingProjectsCount,
    completedProjectsCount,
    clientsCount,
  ] = await Promise.all([
    prisma.project.count({where: {teamId}}),
    prisma.project.count({where: {teamId, endedAt: null}}),
    prisma.project.count({
      where: {teamId, endedAt: {not: null}},
    }),
    prisma.client.count({where: {teamId}}),
  ]);

  return {
    projectsCount,
    clientsCount,
    completedProjectsCount,
    ongoingProjectsCount,
  };
}
