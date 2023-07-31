import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { clients } from "~/db/schema/clients";

export const createNewClientSchema = createInsertSchema(clients, {
  name: z.string().nonempty({ message: "The name cannot be empty." }),
}).pick({ name: true });

export type CreateClientFormData = z.infer<typeof createNewClientSchema>;
