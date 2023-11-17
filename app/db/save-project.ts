import type {Project} from "@prisma/client";
import {z} from "zod";
import isEmpty from "lodash/isEmpty";
import {prisma} from "./prisma-client";
import {v4 as uuid} from "uuid";
import invariant from "tiny-invariant";

export const saveProjectSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, {message: "Name is required"}),
    description: z.string().min(1, {message: "Description is required"}),
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
    clientId: z.string().min(1, {message: "Client is required"}).uuid(),
    endDate: z.undefined(),
  })
  .strict()
  .superRefine((input, ctx) => {
    if (input.endingYear && input.endingMonth) {
      const startDate = new Date(input.startingYear, input.startingMonth);
      const endDate = new Date(input.endingYear, input.endingMonth);

      if (endDate < startDate)
        ctx.addIssue({
          code: "invalid_date",
          message: "End date cannot be earlier than the start date",
          path: ["endDate"],
        });
    }
  });

export type SaveProjectInput = z.infer<typeof saveProjectSchema>;

export async function saveProject(
  teamId: string,
  input: SaveProjectInput
): Promise<Project> {
  const projectId = isEmpty(input.id) ? uuid() : input.id;
  invariant(projectId);

  return prisma.project.upsert({
    where: {id: projectId},
    update: {
      teamId: teamId,
      name: input.name,
      clientId: input.clientId,
      description: input.description,
      startedAt: new Date(input.startingYear, input.startingMonth),
      endedAt:
        input.startingYear && input.startingMonth
          ? new Date(input.startingYear, input.startingMonth)
          : undefined,
    },
    create: {
      id: projectId,
      teamId: teamId,
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
