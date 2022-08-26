import React from "react";

export const ProductColors = (props) => {
  const { colors } = props;
  return (
    <ul className="colors flex space-x-1 my-1">
      {colors.map((color, i) => (
        <li key={i}>
          <button
            className={`h-5 w-5 relative border border-grey-200/75`}
            style={color.data ?{ backgroundColor: color.data } : { backgroundColor: color.color }}
            title={color.title || color.name}
          ></button>
        </li>
      ))}
    </ul>
  );
};
