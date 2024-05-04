"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "./container";
import { Item } from "./sortable-items";

type ItemsState = {
  root: string[];
  container1: string[];
  container2: string[];
  container3: string[];
};

export default function MultipleDragDrop() {
  const [items, setItems] = useState<ItemsState>({
    root: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => `A${i}`),
    container1: [1, 2, 3, 4, 5, 6, 7].map((i) => `B${i}`),
    container2: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `C${i}`),
    container3: [1, 2, 3, 4, 5].map((i) => `D${i}`),
  });

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findContainer(id: UniqueIdentifier) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event: DragOverEvent) {
    // Extract necessary information from the event object
    const { active, over, draggingRect } = event;

    // Extract the IDs of the active and over elements
    const { id } = active;
    const { id: overId } = over;

    // Find the containers corresponding to the active and over elements
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    // If the active or over containers are not found, or they are the same, return
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // Update the state based on the drag-over event
    setItems((prev) => {
      // Extract the arrays of items from the previous state
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes of the active and over items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;

      // not understanding this
      if (overId in prev) {
        // If the overId exists as a key in the previous state, it means we're at the root droppable of a container
        // In this case, set the newIndex to the length of overItems plus 1
        newIndex = overItems.length + 1;
      } else {
        // If overId does not exist in prev, it means we're hovering over an item within the container
        // Check if the dragging item is below the last item in the list
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        // Adjust the modifier based on the position of the dragging item
        const modifier = isBelowLastItem ? 1 : 0;

        // Calculate the new index for the dragging item
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      // Update the state by moving the active item from the active container to the over container
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    // Extract necessary information from the event object
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers corresponding to the active and over elements
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    // If the active or over containers are not found, or they are different, return
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    // Find the indexes of the active and over items in their respective containers
    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    // If the indexes of the active and over items are different, update the state to reflect the new order
    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    // Reset the active ID to null
    setActiveId(null);
  }

  return (
    <div className="flex flex-row">
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="root" items={items.root} />
        <Container id="container1" items={items.container1} />
        <Container id="container2" items={items.container2} />
        <Container id="container3" items={items.container3} />
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
}
