import React from "react";

interface MoneyComponent {
  row: {};
}

const MoneyComponent = ({ row }) => {
  return <div>{console.log(row)}</div>;
};

export default MoneyComponent;
