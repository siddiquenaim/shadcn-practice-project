"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
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
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MoviesProps<MData, MValue> {
  moviesColumn: ColumnDef<MData, MValue>[];
  movies: MData[];
}

export function Movies<MData, MValue>({
  moviesColumn,
  movies,
}: MoviesProps<MData, MValue>) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  //local states
  const [filters, setFilters] = useState<ColumnFiltersState>([]);

  // react table set up
  const allMovies = useReactTable({
    columns: moviesColumn,
    data: movies,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onColumnFiltersChange: setFilters,

    state: {
      columnFilters: filters,
    },
  });

  // useEffect for default functionalities
  useEffect(() => {
    allMovies.setPageSize(8);
  }, [allMovies]);

  // useEffect for filtering
  useEffect(() => {
    const initialFilters = searchParams.get("filter");
    if (initialFilters) {
      const parsedData = JSON.parse(initialFilters);
      const id = Object.keys(parsedData)[0];
      const value = parsedData[id];

      allMovies.getColumn(id)?.setFilterValue(value);
    }
  }, [allMovies, searchParams]);

  // handle set route for useParams
  const handleFilter = (value: string, id: string) => {
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("filter", JSON.stringify({ [id]: value }));

    const validQuery = urlParams.size > 0 ? "?" + urlParams.toString() : "";

    router.push(path + validQuery);
  };

  return (
    <div className="mt-10">
      {/*  filtering */}
      <div>
        <Input
          className="max-w-sm mx-auto text-center text-xl"
          placeholder="Filter Movies"
          onChange={(e) => {
            handleFilter(e.target.value, "title");
          }}
        ></Input>
      </div>

      {/* all movies */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 my-5">
        {allMovies.getRowModel().rows.map((row) => (
          // row.getVisibleCells().map((cell) => (
          <Card key={row.id} className="flex flex-col items-center">
            <CardHeader className="text-center">
              <CardTitle>{row.original.title.slice(0, 15)}</CardTitle>
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
            <CardFooter className="flex-1">
              <Button variant="outline">Watch Movie</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/*  pagination */}
      <div className="flex justify-center gap-3">
        <Button
          disabled={!allMovies.getCanPreviousPage()}
          variant="outline"
          onClick={() => {
            allMovies.setPageIndex(0);
          }}
        >
          {`<<`}
        </Button>
        <Button
          disabled={!allMovies.getCanPreviousPage()}
          variant="outline"
          onClick={() => {
            allMovies.previousPage();
          }}
        >
          Prev
        </Button>
        <div className="flex items-center">
          <p>
            {allMovies.options.state.pagination.pageIndex + 1}/
            {allMovies.getPageCount()}
          </p>
        </div>
        <Button
          variant="outline"
          disabled={!allMovies.getCanNextPage()}
          onClick={() => {
            allMovies.nextPage();
          }}
        >
          Next
        </Button>
        <Button
          variant="outline"
          disabled={!allMovies.getCanNextPage()}
          onClick={() => {
            allMovies.setPageIndex(allMovies.getPageCount() - 1);
          }}
        >
          {`>>`}
        </Button>
      </div>
    </div>
  );
}

export default Movies;
