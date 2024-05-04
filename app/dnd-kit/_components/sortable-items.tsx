import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type Props = {
  id: UniqueIdentifier;
  meta?: string;
};

const style = {
  width: "100%",
  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid black",
  margin: "10px 0",
  background: "white",
};

export const Item = (props: Props) => {
  return <div style={style}>{props?.meta}</div>;
};

export const draggingItem = (props: Props) => {
  return <div style={style}>{props.id}</div>;
};

const SortableItems = (props: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Item id={props?.id} meta={props?.meta}></Item>
    </div>
  );
};

export default SortableItems;
