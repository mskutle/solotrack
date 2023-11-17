import type {Client} from "@prisma/client";
import {prisma} from "./prisma-client";

export async function getClients(teamId: string): Promise<Client[]> {
  return prisma.client.findMany({
    where: {teamId},
  });
}
