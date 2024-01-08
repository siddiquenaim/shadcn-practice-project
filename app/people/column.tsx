"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../data/people";
import DropDownCopy from "@/components/custom/DropDownCopy";

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
    header: "Birth Date",
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
