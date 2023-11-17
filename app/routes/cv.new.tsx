import {
  json,
  type SerializeFrom,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {CvForm} from "~/cv/CvForm";
import {ensureAuthenticated} from "~/auth/helpers";
import {type ProjectList, getProjectList} from "~/db/get-project-list";
import {MainContent} from "~/layouts/MainContent";
import {CvPreview} from "~/cv/CvPreview";
import {useState} from "react";
import {getPersonalTeam} from "~/db/get-personal-team";

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
  const [cv, setCv] = useState<Cv>({projects});

  return (
    <MainContent>
      <div className="p-8 flex gap-8 w-full h-full">
        <div className="grow">
          <CvForm cv={cv} onChange={(updatedCv) => setCv(updatedCv)} />
        </div>
        {/* <div className="grow bg-blue-300">
          <CvPreview cv={cv} />
        </div> */}
      </div>
    </MainContent>
  );
}
