import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  DB_CONNECTION_STRING,
} = z
  .object({
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CALLBACK_URL: z.string(),
    DB_CONNECTION_STRING: z.string(),
  })
  .parse(process.env);

const config = {
  auth: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
  },
  db: { connectionString: DB_CONNECTION_STRING },
};

export { config };
