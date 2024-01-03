import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "~/@/lib/utils";
import { GripVertical } from "lucide-react";

type Props = {
  id: string;
  title: string;
  subtitle: string;
};

export function SortableItem(props: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex gap-8 items-center justify-between bg-yellow-50 rounded-md p-4"
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col">
        <span className="font-bold">{props.title}</span>
        <span className="text-sm text-zinc-600">{props.subtitle}</span>
      </div>
      <GripVertical className={cn("text-zinc-300 group-hover:text-zinc-900")} />
    </div>
  );
}
