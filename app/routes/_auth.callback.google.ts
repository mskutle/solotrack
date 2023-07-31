import { type LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/auth/authenticator";

export async function loader({ request }: LoaderArgs) {
  return authenticator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}
