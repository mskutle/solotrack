import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ensureAuthenticated } from "~/auth/helpers";
import { PageContainer } from "~/layouts/PageContainer";

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  return json(user);
}

export default function CoursesAndCertifications() {
  const user = useLoaderData<typeof loader>();
  return (
    <PageContainer user={user}>
      <div className="grid h-full place-items-center">
        <h1>Courses & Certifications</h1>
      </div>
    </PageContainer>
  );
}
