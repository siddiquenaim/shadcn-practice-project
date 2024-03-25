import React from "react";
import SortableItems from "./sortable-items";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  id: string;
  items: string[];
};

const Container = (props: Props) => {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="p-3 m-3 flex-1 bg-[#dadada]">
        {items.map((id) => (
          <SortableItems key={id} id={id}></SortableItems>
        ))}
      </div>
    </SortableContext>
  );
};

export default Container;
