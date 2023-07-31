import type { SerializeFrom } from "@remix-run/node";
import type { Project } from "./db/schema/projects";

type Props = {
  project: SerializeFrom<Project>;
};

export function Project(props: Props) {
  const { project } = props;
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">{project.name}</h1>
      <p className="whitespace-pre-wrap">{project.description}</p>
    </div>
  );
}
