import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/auth/authenticator";

export async function loader({ request }: LoaderArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
