import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ensureAuthenticated } from "~/auth/helpers";
import { PageContainer } from "~/layouts/PageContainer";

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  return json(user);
}

export default function Dashboard() {
  const user = useLoaderData<typeof loader>();
  return (
    <PageContainer user={user}>
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl font-semibold">Welcome, {user.firstName}!</h1>
      </div>
    </PageContainer>
  );
}
