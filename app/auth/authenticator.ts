import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session-storage";
import { googleStrategy } from "./google-strategy";
import type { User } from "~/db/schema/users";

const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(googleStrategy);

export { authenticator };
