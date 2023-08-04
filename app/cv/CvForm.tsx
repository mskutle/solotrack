import type { SerializeFrom } from "@remix-run/node";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ProjectList } from "../db/get-project-list";
import { SortableItem } from "./SortableItem";
import { useState } from "react";
import invariant from "tiny-invariant";

type Props = {
  projects: SerializeFrom<ProjectList>;
};

export function CvForm(props: Props) {
  const [items, setItems] = useState(props.projects);
  console.log(items.map((i) => i.name));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    invariant(over?.id, "over.id is null");

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((x) => x.id === active.id);
        const newIndex = items.findIndex((x) => x.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          {items.map((p) => (
            <SortableItem
              id={p.id}
              key={p.id}
              title={p.name}
              subtitle={p.client.name}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
