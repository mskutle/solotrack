import { json, Response, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { Project } from "~/Project";
import { ensureAuthenticated } from "~/auth/helpers";
import { db } from "~/db/db";
import { projects } from "~/db/schema/projects";
import { MainContent } from "~/layouts/MainContent";

export async function loader({ request, params }: LoaderArgs) {
  const user = await ensureAuthenticated(request);
  const projectId = z.string().parse(params.id);

  const project = await db.query.projects.findFirst({
    where: and(eq(projects.userId, user.id), eq(projects.id, projectId)),
  });

  if (!project) {
    throw new Response(null, { status: 404 });
  }

  return json(project);
}

export default function ProjectDetails() {
  const project = useLoaderData<typeof loader>();
  return (
    <MainContent>
      <Project key={project.id} project={project} />
    </MainContent>
  );
}

export function ErrorBoundary() {
  return (
    <MainContent>
      <h1 className="text-2xl font-bold">Sorry. Our bad.</h1>
      <p>Something went wrong. Please try again at a later time.</p>
    </MainContent>
  );
}
