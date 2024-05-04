"use client";

import { useState } from "react";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortable";

function Practice() {
  const [items, setItems] = useState([
    { id: "1", text: "A" },
    { id: "2", text: "B" },
    { id: "3", text: "C" },
    { id: "4", text: "D" },
  ]);

  // this constraint is not requried as listeners are on draghandle , { activationConstraint: { distance: 5 } }
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.map((i) => i.id).indexOf(active.id);
        const newIndex = items.map((i) => i.id).indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="App">
      <div className={"gridcontainer"}>
        <DndContext
          id={"grid-dnd-basic"}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <SortableContext
            id={"grid-sort-contextbasic"}
            items={items.map((i) => i?.id)}
          >
            {items.map((value) => {
              return (
                <SortableItem handle={true} key={value?.id} id={value?.id}>
                  <div
                    className={[`bg${"-black"} text-black`, `gridItem`].join(
                      " "
                    )}
                    // onClick={() => handleGridClick(value)}
                  >
                    <p>{value?.text}</p>
                  </div>
                </SortableItem>
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default Practice;
