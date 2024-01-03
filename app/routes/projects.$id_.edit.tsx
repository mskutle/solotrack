import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {useActionData, useLoaderData} from "@remix-run/react";
import {z} from "zod";
import {ProjectForm} from "~/ProjectForm";
import {ensureAuthenticated} from "~/auth/helpers";
import {getClients} from "~/db/get-clients";
import {getPersonalTeam} from "~/db/get-personal-team";
import {getProjectById} from "~/db/get-project-by-id";
import {getAllSkills} from "~/db/get-skills";
import {saveProject, saveProjectSchema} from "~/db/save-project";
import {MainContent} from "~/layouts/MainContent";

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

export async function loader({request, params}: LoaderFunctionArgs) {
  const {id: projectId} = z.object({id: z.string()}).parse(params);

  const user = await ensureAuthenticated(request);
  const team = await getPersonalTeam(user.id);

  const [clients, project, skills] = await Promise.all([
    getClients(team.id),
    getProjectById(projectId),
    getAllSkills(),
  ]);

  if (!project) throw new Response("not found", {status: 404});

  return json({clients, project, skills});
}

export default function EditProject() {
  const {clients, project, skills} = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  return (
    <MainContent align="center">
      <div className="flex flex-col gap-8 max-w-md">
        <h1 className="text-4xl font-bold">Edit project</h1>
        <ProjectForm
          clients={clients}
          skills={skills}
          errors={errors}
          defaultValues={project}
        />
      </div>
    </MainContent>
  );
}
