"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../data/people";
import DropDownCopy from "@/components/custom/DropDownCopy";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Person>[] = [
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
      );
    },
    cell: ({ row }) => {
      const date_of_birth = row.getValue("date_of_birth");
      const formatted = new Date(date_of_birth as string).toLocaleDateString();
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "money",
    header: "Money",
  },
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
    },
  },
];
