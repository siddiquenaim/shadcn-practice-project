import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

const Posts: {
  id: number;
  title: string;
}[] = [
  {
    id: 1,
    title: "Post 1",
  },
  {
    id: 2,
    title: "Post 2",
  },
];

const TanStack = () => {
  return <div>TanStack Query</div>;
};

export default TanStack;

// query is getting data from somewhere and mutation is changing some data
