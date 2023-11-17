import {prisma} from "./prisma-client";

export type ProjectList = Awaited<ReturnType<typeof getProjectList>>;
export type ProjectListItem = ProjectList[number];

export async function getProjectList(teamId: string) {
  return prisma.project.findMany({
    where: {teamId},
    include: {client: true},
    orderBy: {startedAt: "desc"},
  });
}
