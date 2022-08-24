import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { priceWithCurrency } from "../helpers/priceWithCurrency";
import { ratingToNumber } from "../helpers/ratingToNumber";
import { ProductColors } from "./ProductColors";
import { Stars } from "./Stars";
import bluse from "../images/bluse.png";

export const ProductCard = (props) => {
  const { product, className, maxInRow } = props;

  const [isReady, changeToReady] = useState(false);

  const maxInRowNumber = maxInRow || 4;

  const defaultClass = "w-full md:w-1/2 lg:w-1/"+maxInRowNumber;

  const additionalClass = className || defaultClass;

  useEffect(() => {
    setTimeout(() => {
      changeToReady(true);
    }, 2000);
  });

  return (
    <div
      className={
        "product-card-wrapper p-2 " +
        additionalClass
      }
    >
      <div className="product-card flex flex-col justify-center items-center bg-grey-0 px-10 pt-4 pb-8">
        <img
          className="max-w-[10rem]"
          src={bluse}
          alt={product.name}
          title={product.name}
        />
        <hr className="bg-grey-200 w-2/3 my-2" />
        <h3 className="font-semibold" title={product.name}>
          {product.name}
        </h3>
        <ProductColors colors={product.colors} />
        <span
          className="font-bold"
          title={priceWithCurrency(product.prices[1])}
        >
          {priceWithCurrency(product.prices[1])}
        </span>
        <Stars rate={ratingToNumber(product.rating)} />
      </div>
    </div>
  );
};
