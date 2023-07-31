import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ensureAuthenticated } from "~/auth/helpers";
import { PageContainer } from "~/layouts/PageContainer";

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  return json(user);
}

export default function Cv() {
  const user = useLoaderData<typeof loader>();
  return (
    <PageContainer user={user}>
      <div className="h-full grid place-items-center">
        <h1>CV</h1>
      </div>
    </PageContainer>
  );
}
