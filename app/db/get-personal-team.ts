import {prisma} from "./prisma-client";

export async function getPersonalTeam(userId: string) {
  const team = await prisma.team.findFirstOrThrow({
    where: {
      isPersonal: true,
      members: {some: {id: userId}},
    },
  });

  return team;
}
