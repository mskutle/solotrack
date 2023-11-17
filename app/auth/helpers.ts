import {authenticator} from "./authenticator";

export async function ensureAuthenticated(request: Request) {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}
