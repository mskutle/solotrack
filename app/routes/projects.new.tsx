import {
  type LoaderArgs,
  type ActionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { Button } from "~/@/components/ui/button";

import { ProjectForm } from "~/ProjectForm";
import { ensureAuthenticated } from "~/auth/helpers";
import { db } from "~/db/db";
import { type InsertProject, projects } from "~/db/schema/projects";
import { useId } from "react";
import { Save } from "lucide-react";
import { MainContent } from "~/layouts/MainContent";

export async function action({ request }: ActionArgs) {
  const user = await ensureAuthenticated(request);
  const formData = await request.formData();

  const result = createInsertSchema(projects, {
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().optional(),
  })
    .omit({ id: true, userId: true })
    .strict()
    .safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return json(
      { success: false, errors: result.error.format() },
      { status: 400 }
    );
  }

  const project: InsertProject = {
    ...result.data,
    id: uuid(),
    userId: user.id,
  };

  await db.insert(projects).values(project);

  return redirect(".");
}

export async function loader({ request }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  return json(user);
}

export default function NewProject() {
  const projectFormId = useId();
  return (
    <MainContent>
      <div className="max-w-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold">New project</h1>
        <ProjectForm id={projectFormId} />
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
