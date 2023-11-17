import {z} from "zod";
import {prisma} from "./prisma-client";
import {v4 as uuid} from "uuid";

const saveUserSchema = z
  .object({
    id: z.string().optional(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    photoUrl: z.string(),
  })
  .strict();

export async function saveUser(input: SaveUserInput) {
  return prisma.user.upsert({
    where: {id: input.id},
    create: {
      id: uuid(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      photoUrl: input.photoUrl,
    },
    update: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      photoUrl: input.photoUrl,
    },
  });
}

export type SaveUserInput = z.infer<typeof saveUserSchema>;
export type CreateUserInput = SaveUserInput;
