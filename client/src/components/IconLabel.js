import React from "react";

export const IconLabel = (props) => {
  return <div className={""+props.className}>{props.icon}<span className="pl-2">{props.children}</span></div>;
};
