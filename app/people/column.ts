import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../data/people";

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
  },
  {
    accessorKey: "money",
    header: "Money",
  },
];
