import React from "react";
import PeopleDataTable from "./PeopleDataTable";
import { columns } from "./column";
import { people } from "../data/people";

type Props = {};

const People = (props: Props) => {
  return (
    <div className="container py-10 mx-auto">
      <PeopleDataTable columns={columns} data={people} />
    </div>
  );
};

export default People;
