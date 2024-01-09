"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../data/people";
import DropDownCopy from "@/components/custom/DropDownCopy";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import MoneyComponent from "@/components/custom/MoneyComponent";

export const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        ></Checkbox>
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        ></Checkbox>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Person ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date_of_birth",
    header: ({ header }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            header.column.toggleSorting(header.column.getIsSorted() === "asc")
          }
        >
          Date of Birth <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        // toggleSorting Method:

        // It's used to toggle the sorting state of the column (between ascending and descending order).
        // It accepts a boolean argument (true for ascending, false for descending).
        // The argument passed to toggleSorting is determined by checking the current sorting state of the column:
        // header.column.getIsSorted() === "asc": This part checks if the column is currently sorted in ascending order.
        // If it's ascending, toggleSorting is called with false to switch to descending order.
        // If it's not ascending (i.e., already descending or not sorted), toggleSorting is called with true to switch to ascending order.
      );
    }, //sorting
    cell: ({ row }) => {
      const date_of_birth = row.getValue("date_of_birth");
      const formatted = new Date(date_of_birth as string).toLocaleDateString();
      return <div>{formatted}</div>;
    }, //cell formatting
  },
  // {
  //   accessorKey: "money",
  //   header: "Money",
  //   cell: ({ row }) => {
  //     return (
  //       <div>
  //         <MoneyComponent row={row} />
  //       </div>
  //     );
  //   },
  // },

  {
    id: "action",
    header: "Copy Text",
    cell: ({ row }) => {
      const person = row.original;
      const personName = person.first_name;
      return (
        <div>
          <DropDownCopy personName={personName} />
        </div>
      );
    }, //cell action
  },
];
