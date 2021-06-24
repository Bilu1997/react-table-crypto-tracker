import React from "react";
import "./GlobalFilter.css";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <>
      <span className="input__container">
        <input
          className="input__search"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </>
  );
};
