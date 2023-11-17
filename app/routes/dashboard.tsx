import {json, type LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {ensureAuthenticated} from "~/auth/helpers";
import {Greeting} from "~/dashboard/Greeting";
import {Metrics} from "~/dashboard/Metrics";
import {getMetrics} from "~/db/get-dashboard-metrics";
import {getPersonalTeam} from "~/db/get-personal-team";
import {MainContent} from "~/layouts/MainContent";
import {PageContainer} from "~/layouts/PageContainer";

export async function loader({request}: LoaderFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const team = await getPersonalTeam(user.id);
  const metrics = await getMetrics(team.id);

  return json({user, metrics});
}

export default function DashboardPage() {
  const {user, metrics} = useLoaderData<typeof loader>();
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
