import type { Client } from "@prisma/client";
import { prisma } from "./prisma-client";
import { v4 as uuid } from "uuid";

export async function createClient(
  userId: string,
  name: string
): Promise<Client> {
  return prisma.client.create({
    data: { id: uuid(), name, userId },
  });
}
