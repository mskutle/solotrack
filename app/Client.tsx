import type {SerializeFrom} from "@remix-run/node";
import {Pencil, Trash2} from "lucide-react";
import {Button} from "./@/components/ui/button";
import type {Client} from "@prisma/client";

type Props = {
  client: SerializeFrom<Client>;
};

export function Client(props: Props) {
  const {client} = props;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between bg-zinc-50 p-8">
        <h1 className="text-4xl font-bold">{client.name}</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            size="icon"
          >
            <Pencil className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center gap-2 text-red-500 hover:text-red-500"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
