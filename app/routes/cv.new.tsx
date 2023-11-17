import {
  json,
  type SerializeFrom,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {ensureAuthenticated} from "~/auth/helpers";
import {type ProjectList, getProjectList} from "~/db/get-project-list";
import {MainContent} from "~/layouts/MainContent";
import {getPersonalTeam} from "~/db/get-personal-team";
import {CvForm} from "~/cv/CvForm";

export async function loader({request}: LoaderFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const team = await getPersonalTeam(user.id);
  const projects = await getProjectList(team.id);

  return json(projects);
}

export type Cv = {
  projects: SerializeFrom<ProjectList>;
};

export default function NewCv() {
  const projects = useLoaderData<typeof loader>();

  return (
    <MainContent>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold">Create a new CV</h1>
          <p className="text-gray-700 mt-1">
            Create a specialized CV for your proposal.
          </p>
        </div>
        <CvForm projects={projects} />
      </div>
    </MainContent>
  );
}
