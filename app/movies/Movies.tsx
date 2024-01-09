"use client";

import React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MoviesProps<MData, MValue> {
  moviesColumn: ColumnDef<MData, MValue>[];
  movies: MData[];
}

export function Movies<MData, MValue>({
  moviesColumn,
  movies,
}: MoviesProps<MData, MValue>) {
  // react table set up
  const table = useReactTable({
    columns: moviesColumn,
    data: movies,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-5">
      {table.getRowModel().rows.map((row) => (
        // row.getVisibleCells().map((cell) => (
        <Card key={row.id} className="flex flex-col items-center">
          <CardHeader>
            <CardTitle>{row.original.title}</CardTitle>
            <CardDescription>Genre: {row.original.genre}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              height={100}
              width={100}
              src={row.original.image}
              alt="image"
            ></Image>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Watch Movie</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Movies;
