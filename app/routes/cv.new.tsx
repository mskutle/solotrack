import { json, type SerializeFrom, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CvForm } from "~/cv/CvForm";
import { ensureAuthenticated } from "~/auth/helpers";
import { type ProjectList, getProjectList } from "~/db/get-project-list";
import { MainContent } from "~/layouts/MainContent";
import { CvPreview } from "~/cv/CvPreview";
import { useState } from "react";

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  const projects = await getProjectList(user.id);

  return json(projects);
}

export type Cv = {
  projects: SerializeFrom<ProjectList>;
};

export default function NewCv() {
  const projects = useLoaderData<typeof loader>();
  const [cv, setCv] = useState<Cv>({ projects });

  return (
    <MainContent centerX={false} pad={false}>
      <div className="p-8 flex gap-8 w-full h-full">
        <div className="shrink-0">
          <CvForm cv={cv} onChange={(updatedCv) => setCv(updatedCv)} />
        </div>
        <div className="grow bg-blue-300">
          <CvPreview cv={cv} />
        </div>
      </div>
    </MainContent>
  );
}
