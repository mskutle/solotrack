import { GoogleStrategy } from "remix-auth-google";
import { config } from "~/config";
import { getUserByEmail } from "~/db/get-user-by-email";
import { createUser } from "~/db/create-user";

const { clientId, clientSecret, callbackURL } = config.auth.google;

export const googleStrategy = new GoogleStrategy(
  {
    clientID: clientId,
    clientSecret,
    callbackURL,
  },
  async ({ profile }) => {
    const existingUser = await getUserByEmail(profile.emails[0].value);

    if (existingUser) {
      return existingUser;
    }

    const newUser = await createUser({
      id: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      photoUrl: profile.photos[0].value,
    });

    return newUser;
  }
);
