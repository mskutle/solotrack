import {LoaderFunctionArgs, json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {ensureAuthenticated} from "~/auth/helpers";
import {MainContent} from "~/layouts/MainContent";
import {PageContainer} from "~/layouts/PageContainer";

export async function loader({request}: LoaderFunctionArgs) {
  const user = await ensureAuthenticated(request);
  return json(user);
}

export default function ProfilePage() {
  const user = useLoaderData<typeof loader>();

  return (
    <PageContainer user={user}>
      <MainContent>
        <h1>The profile</h1>
      </MainContent>
    </PageContainer>
  );
}
