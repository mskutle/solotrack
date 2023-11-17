import {prisma} from "./prisma-client";

export type GetUserByEmail = Awaited<ReturnType<typeof getUserByEmail>>;

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {email},
  });
}
