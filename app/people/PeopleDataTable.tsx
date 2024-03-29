"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { downLoadToExcel } from "@/lib/xlsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PeopleDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  //router and paths
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  //local states for table functionality
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // setting table data
  const table = useReactTable({
    //data and column to generate table
    data,
    columns,

    //table core functions
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    //on states change
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    //update state
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    table.setColumnVisibility({
      date_of_birth: false,
      id: false,
      email: false,
    });
  }, [table]);

  //useEffect for filters
  useEffect(() => {
    const initialFilters = searchParams.get("filters");

    if (initialFilters) {
      const parsedData = JSON.parse(initialFilters);
      const id = Object.keys(parsedData)[0];
      const value = parsedData[id];

      table.getColumn(id)?.setFilterValue(value);
    }
    if (!initialFilters) table.resetColumnFilters(true);
  }, [searchParams, table]);

  //set search params in router
  const handleFilter = (value: string, id: string) => {
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("filters", JSON.stringify({ [id]: value }));

    //set search query
    const validQuery = urlParams.size > 0 ? "?" + urlParams.toString() : "";

    router.push(path + validQuery);
  };

  return (
    <div className="mb-20 mt-10">
      {/* table control options */}
      <div className="flex justify-between items-center py-4">
        {/* filter first name */}
        <Input
          placeholder="Filter First Name"
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) || ""
          }
          onChange={(e) => {
            handleFilter(e.target.value, "first_name");
          }}
          className="max-w-sm"
        />

        <div className="flex gap-3">
          {/* export to excel */}
          <Button variant="default" onClick={() => downLoadToExcel()}>
            Export To Excel
          </Button>

          {/* column visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((selectedColumn) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={selectedColumn.id}
                      className="capitalize"
                      checked={selectedColumn.getIsVisible()}
                      onCheckedChange={(value: boolean) => {
                        selectedColumn.toggleVisibility(!!value);
                      }}
                    >
                      {selectedColumn.id}
                    </DropdownMenuCheckboxItem>

                    // The !!value expression coerces the boolean value to its boolean equivalent (true or false), ensuring it's a valid argument for toggleVisibility (a boolean value).
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* table */}
      <div className="rounded-md border">
        <Table className="text-center">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Result</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination and row selection text */}
      <div className="flex justify-between">
        <div className="my-2">
          {table.getFilteredSelectedRowModel().rows.length} of {` `}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {/* pagination */}
        <div className="flex justify-end space-x-2 my-2">
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            variant="outline"
          >
            {`<<`}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
          >
            Next
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            variant="outline"
          >
            {`>>`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PeopleDataTable;
