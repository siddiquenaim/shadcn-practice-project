import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import wait from "./wait";

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
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...Posts]),
  });

  return <div className="text-2xl text-white">TanStack Query</div>;
};

export default TanStack;

// query is getting data from somewhere and mutation is changing some data
