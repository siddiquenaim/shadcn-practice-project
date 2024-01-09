import xlsx, { IJsonSheet } from "json-as-xlsx";
import { people } from "@/app/data/people";

export function downLoadToExcel() {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        {
          label: "Person ID",
          value: "id",
        },
        {
          label: "First Name",
          value: "first_name",
        },
        {
          label: "Last Name",
          value: "last_name",
        },
        {
          label: "Email",
          value: "email",
        },
        {
          label: "Date of Birth",
          value: (row) => new Date(row.date_of_birth).toLocaleDateString(),
        },
        {
          label: "Money",
          value: "money",
        },
      ],

      content: people,
    },
  ];

  let settings = {
    fileName: "People",
  };

  xlsx(columns, settings);
}
