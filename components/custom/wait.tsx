import React from "react";

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default wait;
