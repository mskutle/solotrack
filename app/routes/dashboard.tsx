import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ensureAuthenticated } from "~/auth/helpers";
import { Greeting } from "~/dashboard/Greeting";
import { Metrics } from "~/dashboard/Metrics";
import { getDashboardMetrics } from "~/db/get-dashboard-metrics";
import { MainContent } from "~/layouts/MainContent";
import { PageContainer } from "~/layouts/PageContainer";

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  const metrics = await getDashboardMetrics(user.id);

  return json({ user, metrics });
}

export default function DashboardPage() {
  const { user, metrics } = useLoaderData<typeof loader>();
  return (
    <PageContainer user={user}>
      <MainContent>
        <div className="flex flex-col gap-8">
          <Greeting user={user} />
          <Metrics metrics={metrics} />
        </div>
      </MainContent>
    </PageContainer>
  );
}
