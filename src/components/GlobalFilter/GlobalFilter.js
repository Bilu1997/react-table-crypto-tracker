import React from "react";
import "./GlobalFilter.css";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <>
      <span className="input__container">
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </>
  );
};
