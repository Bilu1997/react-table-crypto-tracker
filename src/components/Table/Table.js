import React, { useState } from "react";
import { useTable, useFilters } from "react-table";

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table

  // Update the state when input changes
  const [filterInput, setFilterInput] = useState("");
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("show.name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters // Adding the useFilters Hook to the table
    // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {typeof cell === "number"
                      ? cell.render("Cell").toFixed(2)
                      : cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
