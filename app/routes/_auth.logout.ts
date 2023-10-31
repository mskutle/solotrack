import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/auth/authenticator";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
