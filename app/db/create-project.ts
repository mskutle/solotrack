import type { Project } from "@prisma/client";
import { z } from "zod";
import { prisma } from "./prisma-client";
import { v4 as uuid } from "uuid";

export const createProjectSchema = z
  .object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().optional(),
    clientId: z.string().uuid(),
  })
  .strict();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export async function createProject(
  userId: string,
  input: CreateProjectInput
): Promise<Project> {
  console.log({ userId, input });
  return prisma.project.create({
    data: {
      id: uuid(),
      ownerId: userId,
      name: input.name,
      clientId: input.clientId,
      description: input.description,
      startedAt: input.startedAt,
      endedAt: input.endedAt,
    },
  });
}
