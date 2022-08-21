import React from "react";

export const ProductColors = (props) => {
  const { colors } = props;
  return (
    <ul class="colors flex space-x-1 my-1">
      {colors.map((color, i) => (
        <li>
          <button
            className={`h-5 w-5 relative border border-grey-200/75`}
            style={{ backgroundColor: color.color }}
            title={color.name}
          ></button>
        </li>
      ))}
    </ul>
  );
};
