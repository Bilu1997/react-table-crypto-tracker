import React from "react";
import "./Banner.css";
const Banner = ({ price }) => {
  return (
    <>
      <div className="banner__container">
        <p>{price}</p>
      </div>
    </>
  );
};

export default Banner;
