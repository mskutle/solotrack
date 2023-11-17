import type {SerializeFrom} from "@remix-run/node";
import {Linkifyer} from "./common/Linkifyer";
import type {Project} from "@prisma/client";
import {Button} from "./@/components/ui/button";
import {Pencil} from "lucide-react";
import {Link} from "@remix-run/react";

type Props = {
  project: SerializeFrom<Project>;
};

export function Project(props: Props) {
  const {project} = props;
  return (
    <article className="flex flex-col gap-4 w-full">
      <div className="flex justify-between bg-zinc-50 p-8">
        <h1 className="text-4xl font-bold">{project.name}</h1>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2"
            size="default"
          >
            <Link to="edit">
              <Pencil className="w-5 h-5" />
              <span>Edit</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="px-8 py-4 max-w-xl space-y-4">
        <h2 className="text-xl font-semibold">About the project</h2>
        <p className="whitespace-pre-wrap">
          <Linkifyer>{project.description}</Linkifyer>
        </p>
      </div>
    </article>
  );
}
