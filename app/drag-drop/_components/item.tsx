import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
import { MenuItem } from "../store/menuInit";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: MenuItem[];
  withOpacity?: boolean;
  isDragging?: boolean;
};

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "50% 50%",
      height: "140px",
      width: "140px",
      borderRadius: "10px",
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    console.log(props);

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        {id.meta}
      </div>
    );
  }
);

export default Item;
