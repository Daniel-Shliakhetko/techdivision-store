import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { priceWithCurrency } from "../helpers/priceWithCurrency";
import { ratingToNumber } from "../helpers/ratingToNumber";
import { Stars } from "./Stars";

export const ProductCard = (props) => {
  const { product } = props;

  const [isReady, changeToReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      changeToReady(true);
    }, 2000);
  });

  return (
    <div className="product-card flex flex-col justify-center items-center w-1/4 bg-grey-0 p-4 pb-8">
      <hr className="bg-grey-200 w-2/3 mb-2" />
      <h3 clasName="font-semibold">{product.name}</h3>
      <span className="font-bold">{priceWithCurrency(product.prices[1])}</span>
      <Stars rate={ratingToNumber(product.rating)} />
    </div>
  );
};
