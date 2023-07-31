import { GoogleStrategy } from "remix-auth-google";
import { config } from "~/config";
import { db } from "~/db/db";
import { eq } from "drizzle-orm";
import { users } from "~/db/schema/users";

const { clientId, clientSecret, callbackURL } = config.auth.google;

export const googleStrategy = new GoogleStrategy(
  {
    clientID: clientId,
    clientSecret,
    callbackURL,
  },
  async ({ profile }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, profile.emails[0].value),
      });

      if (existingUser) {
        return existingUser;
      }

      const newUser = await db
        .insert(users)
        .values({
          id: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          photoUrl: profile.photos[0].value,
        })
        .returning();

      return newUser[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
