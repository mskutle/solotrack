import { prisma } from "./prisma-client";

export type GetUserById = Awaited<ReturnType<typeof getUserById>>;

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}
