import { z } from "zod";
import { prisma } from "./prisma-client";

const createUserSchema = z
  .object({
    id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    photoUrl: z.string(),
  })
  .strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;

export async function createUser(input: CreateUserInput) {
  return prisma.user.create({
    data: input,
  });
}
