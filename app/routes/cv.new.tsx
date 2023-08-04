import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CvForm } from "~/cv/CvForm";
import { ensureAuthenticated } from "~/auth/helpers";
import { getProjectList } from "~/db/get-project-list";
import { MainContent } from "~/layouts/MainContent";

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  const projects = await getProjectList(user.id);

  return json(projects);
}

export default function NewCv() {
  const projects = useLoaderData<typeof loader>();
  return (
    <MainContent>
      <div className="mt-4">
        <CvForm projects={projects} />
      </div>
    </MainContent>
  );
}
