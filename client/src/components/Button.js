import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { IconLabel } from "./IconLabel";

export const AddToCart = (props) => {
  return (
    <button className="h-8 bg-black text-white uppercase w-2/3 font-bold">
      <IconLabel className="" icon={<FontAwesomeIcon icon={faCartShopping} />}>
        add to cart
      </IconLabel>
    </button>
  );
};

export const SettleButton = (props) => {
    return (
      <button className="h-8 bg-yellow-500 uppercase w-1/3 font-black">
          Buy
      </button>
    );
  };
