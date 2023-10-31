import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { Project } from "~/Project";
import { ensureAuthenticated } from "~/auth/helpers";
import { getProjectById } from "~/db/get-project-by-id";
import { MainContent } from "~/layouts/MainContent";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await ensureAuthenticated(request);
  const projectId = z.string().parse(params.id);

  const project = await getProjectById(projectId);

  if (!project) {
    throw new Response(null, { status: 404 });
  }

  return json(project);
}

export default function ProjectDetails() {
  const project = useLoaderData<typeof loader>();
  return (
    <MainContent align="center">
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
