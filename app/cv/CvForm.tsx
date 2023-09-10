import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import invariant from "tiny-invariant";
import { SortableItem } from "./SortableItem";
import type { Cv } from "~/routes/cv.new";

type Props = {
  cv: Cv;
  onChange: (cv: Cv) => void;
};

export function CvForm(props: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const items = props.cv.projects;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    invariant(over?.id, "over.id is null");

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((x) => x.id === active.id);
      const newIndex = items.findIndex((x) => x.id === over.id);

      props.onChange({ projects: arrayMove(items, oldIndex, newIndex) });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div>
          <h1 className="text-xl font-bold">Projects</h1>
          <ul className="flex flex-col gap-2 mt-2">
            {items.map((p) => (
              <SortableItem
                id={p.id}
                key={p.id}
                title={p.name}
                subtitle={p.client.name}
              />
            ))}
          </ul>
        </div>
      </SortableContext>
    </DndContext>
  );
}
