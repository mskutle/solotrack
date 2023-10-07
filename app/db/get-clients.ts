import type { Client } from "@prisma/client";
import { prisma } from "./prisma-client";

export async function getClients(userId: string): Promise<Client[]> {
  return prisma.client.findMany({
    where: { userId },
  });
}
