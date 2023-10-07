import {
  type LoaderArgs,
  type ActionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Button } from "~/@/components/ui/button";

import { ProjectForm } from "~/ProjectForm";
import { ensureAuthenticated } from "~/auth/helpers";
import { useId } from "react";
import { Save } from "lucide-react";
import { MainContent } from "~/layouts/MainContent";
import { getClients } from "~/db/get-clients";
import { useLoaderData } from "@remix-run/react";
import { createProject, createProjectSchema } from "~/db/create-project";

export async function action({ request }: ActionArgs) {
  const user = await ensureAuthenticated(request);
  const formData = await request.formData();

  const createProjectRequest = createProjectSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!createProjectRequest.success) {
    return json(
      { success: false, errors: createProjectRequest.error.format() },
      { status: 400 }
    );
  }

  await createProject(user.id, createProjectRequest.data);

  return redirect(".");
}

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  const clients = await getClients(user.id);
  return json(clients);
}

export default function NewProject() {
  const projectFormId = useId();
  const clients = useLoaderData<typeof loader>();
  return (
    <MainContent>
      <div className="max-w-md flex flex-col gap-8">
        <h1 className="text-4xl font-bold">New project</h1>
        <ProjectForm id={projectFormId} clients={clients} />
        <Button
          form={projectFormId}
          type="submit"
          variant="default"
          className="self-end flex items-center gap-2"
        >
          <Save />
          <span>Save</span>
        </Button>
      </div>
    </MainContent>
  );
}
