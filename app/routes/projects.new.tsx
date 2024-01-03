import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {ensureAuthenticated} from "~/auth/helpers";
import {MainContent} from "~/layouts/MainContent";
import {getClients} from "~/db/get-clients";
import {useActionData, useLoaderData} from "@remix-run/react";
import {saveProject, saveProjectSchema} from "~/db/save-project";
import {getPersonalTeam} from "~/db/get-personal-team";
import {ProjectForm} from "~/ProjectForm";
import {getAllSkills} from "~/db/get-skills";

export async function action({request}: ActionFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const team = await getPersonalTeam(user.id);
  const formData = await request.formData();

  const validationResult = saveProjectSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validationResult.success) {
    return json(validationResult.error.flatten(), {status: 400});
  }

  const project = await saveProject(team.id, validationResult.data);

  return redirect(`/projects/${project.id}`);
}

export async function loader({request}: LoaderFunctionArgs) {
  const user = await ensureAuthenticated(request);
  const team = await getPersonalTeam(user.id);

  const [clients, skills] = await Promise.all([
    getClients(team.id),
    getAllSkills(),
  ]);

  return json({clients, skills});
}

export default function NewProject() {
  const errors = useActionData<typeof action>();
  const {clients, skills} = useLoaderData<typeof loader>();

  return (
    <MainContent align="center">
      <div className="max-w-md flex flex-col gap-8">
        <h1 className="text-4xl font-bold">New project</h1>
        <ProjectForm clients={clients} errors={errors} skills={skills} />
      </div>
    </MainContent>
  );
}
