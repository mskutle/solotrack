import type { Project } from "@prisma/client";
import { z } from "zod";
import { prisma } from "./prisma-client";
import { v4 as uuid } from "uuid";

export const createProjectSchema = z
  .object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    startingMonth: z.coerce.number().int().min(0).max(11),
    startingYear: z.coerce
      .number()
      .int()
      .min(1000)
      .max(new Date().getFullYear()),
    endingMonth: z.coerce.number().int().min(0).max(11).optional(),
    endingYear: z.coerce
      .number()
      .int()
      .min(1000)
      .max(new Date().getFullYear())
      .optional(),
    clientId: z.string().uuid(),
  })
  .strict();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export async function createProject(
  userId: string,
  input: CreateProjectInput,
): Promise<Project> {
  return prisma.project.create({
    data: {
      id: uuid(),
      ownerId: userId,
      name: input.name,
      clientId: input.clientId,
      description: input.description,
      startedAt: new Date(input.startingYear, input.startingMonth),
      endedAt:
        input.startingYear && input.startingMonth
          ? new Date(input.startingYear, input.startingMonth)
          : undefined,
    },
  });
}
