import { z } from "zod";

export const createNewClientSchema = z.object({
  name: z.string().nonempty({ message: "The name cannot be empty." }),
});

export type CreateClientFormData = z.infer<typeof createNewClientSchema>;
