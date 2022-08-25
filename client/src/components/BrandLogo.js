import React from "react";

export const BrandLogo = (props) => {
  const { image, title } = props;

  return image ? (
    <img src={image} alt={title} title={title} />
  ) : (
    <div
      className="flex justify-center items-center bg-grey-200 uppercase italic font-bold px-3 py-2.5"
      title={title}
    >
      {title}
    </div>
  );
};
