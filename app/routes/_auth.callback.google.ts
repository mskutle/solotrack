import { type LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/auth/authenticator";

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}
