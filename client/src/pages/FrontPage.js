import React from "react";
import { ProductCard } from "../components/ProductCard";

const products = [
  {
    name: "Bluse",
    colors:[
      {name:"Black", color:"#201f1d"},
      {name:"Gray", color:"#a19c96"},
      {name:"Brown Yellow", color:"#b39468"},
      {name:"White", color:"#e5e4df"}
    ],
    prices: [
      { currency: "usd", price: 27.95 },
      { currency: "eur", price: 25.95 },
      { currency: "rub", price: 1999.95 },
      { currency: "uah", price: 999.95 },
    ],
    rating: [
      { rate: 1, votes: 445 },
      { rate: 2, votes: 44 },
      { rate: 3, votes: 130 },
      { rate: 4, votes: 534 },
      { rate: 5, votes: 245 },
    ],
  },
];

export const FrontPage = (props) => {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row flex-wrap bg-grey-200 sm:px-20 sm:py-12">
        <ProductCard product={products[0]}/>
        <ProductCard product={products[0]}/>
        <ProductCard product={products[0]}/>
        <ProductCard product={products[0]}/>
        <ProductCard product={products[0]}/>
        <ProductCard product={products[0]}/>
        <ProductCard product={products[0]}/>
      </div>
    </>
  );
};
