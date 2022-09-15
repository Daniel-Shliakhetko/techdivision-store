import React from "react";
import { useParams } from "react-router-dom";

export const ImagePage = (props) => {
  const params = useParams();

  // const {image} = import("../../../"+ params.filename);
  let image;
  try {
    image = require("../images/" + params.filename);
  } catch (e) {
    image = false;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {image ? (
        <img className="" src={image} alt="none image" />
      ) : (
        <span className="text-3xl font-bold">Nothing Found!</span>
      )}
    </div>
  );
};
