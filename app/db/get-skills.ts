import {prisma} from "./prisma-client";

export async function getAllSkills() {
  return prisma.skill.findMany({orderBy: {name: "asc"}});
}
