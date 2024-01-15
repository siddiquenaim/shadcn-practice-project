"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import wait from "./wait";
import { Button } from "../ui/button";

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
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...Posts]),
  });

  const newPostMutation = useMutation({
    mutationFn: async (title: string) => {
      return await wait(1000).then(() =>
        Posts.push({ id: crypto.randomUUID, title })
      );
    },
    onSuccess: () => {
      postQuery.refetch();
      // queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postQuery.isLoading) {
    return <div>Loading..</div>;
  }

  if (postQuery.error) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl my-10">TanStack Query</h1>
      <div>
        {postQuery.data?.map((singlePost) => (
          <p key={singlePost.id}>{singlePost.title}</p>
        ))}
      </div>
      <Button
        className="btn btn-primary mt-3"
        onClick={() => newPostMutation.mutate("New Post")}
        variant="outline"
      >
        Add New
      </Button>
    </div>
  );
};

export default TanStack;

// query is getting data from somewhere and mutation is changing some data
