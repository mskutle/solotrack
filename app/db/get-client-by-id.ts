import { prisma } from "./prisma-client";

export type GetClientById = Awaited<ReturnType<typeof getClientById>>;

export async function getClientById(id: string) {
  return prisma.client.findUnique({ where: { id } });
}
