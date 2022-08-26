import React from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Stars } from "../components/Stars";
import { useParams } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo";
import { ProductColors } from "../components/ProductColors";
import { priceWithCurrency } from "../helpers/priceWithCurrency";
import { AddToCart, SettleButton } from "../components/Button";

const product = {
  title: "Bluse",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi magnam sequi esse nam odio maiores error quaerat voluptatibus, voluptatum laborum culpa earum animi provident ullam nesciunt nemo? Earum, reiciendis illo.",
  colors: [
    { name: "Black", color: "#201f1d" },
    { name: "Gray", color: "#a19c96" },
    { name: "Brown Yellow", color: "#b39468" },
    { name: "White", color: "#e5e4df" },
  ],
  prices: [
    { currency: "usd", price: 27.95, discount: 12.5 },
    { currency: "eur", price: 25.95, discount: 12.5 },
    { currency: "rub", price: 1999.95, discount: 12.5 },
    { currency: "uah", price: 999.95, discount: 12.5 },
  ],
  categories: [
    {
      parent: "/",
      category: "/color",
      title: "Color",
      description: "There are all colors",
      data: "",
    },
    {
      parent: "/color",
      category: "/color/gray",
      title: "Gray",
      description: "There are all gray products",
      data: "#a19c96",
    },
    {
      parent: "/color",
      category: "/color/black",
      title: "Black",
      description: "There are all gray products",
      data: "#201f1d",
    },
    {
      parent: "/color",
      category: "/color/brown-yellow",
      title: "Brown Yellow",
      description: "There are all gray brown yellow",
      data: "#b39468",
    },
    {
      parent: "/color",
      category: "/color/white",
      title: "White",
      description: "There are all gray white",
      data: "#e5e4df",
    },
    {
      parent: "/",
      category: "/brand",
      title: "Brand",
      description: "There are all brands",
      data: "",
    },
    {
      parent: "/brand",
      category: "/brand/gucci",
      title: "Gucci",
      description: "There are all Gucci products",
      data: "",
    },
  ],
  rating: [
    { rate: 1, votes: 415 },
    { rate: 2, votes: 44 },
    { rate: 3, votes: 130 },
    { rate: 4, votes: 534 },
    { rate: 5, votes: 245 },
  ],
  comments: [{ user: "", title: "", description: "" }],
};

export const ProductPage = (props) => {
  const colors = product.categories.filter(
    (category) => category.parent === "/color"
  );

  const brand = product.categories.find(
    (category) => category.parent === "/brand"
  );

  return (
    <div className="px-4 md:px-12">
      <BreadCrumbs objectTitle={product.title} />
      <hr className="h-1 mb-1.5 bg-grey-200/50" />
      <MainInfo rating={product.rating} brand={brand}>
        {product.title}
      </MainInfo>
      <Payment colors={colors} prices={product.prices}></Payment>
      <Description>{product.description}</Description>
    </div>
  );
};

const MainInfo = (props) => {
  const params = useParams();

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="font-bold text-2xl uppercase">{props.children}</h1>
        <BrandLogo title={props.brand.title} />
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-2">
        <span>Product №: {params.id}</span>
        <Stars rating={props.rating} showNumberOfVotes={true} />
      </div>
    </SectionWrapper>
  );
};

const Description = (props) => {
  return (
    <SectionWrapper>
      <p>{props.children}</p>
    </SectionWrapper>
  );
};

const Payment = (props) => {
  const priceWithDiscount =
    Math.floor(
      product.prices[1].price * (1 - product.prices[1].discount / 100) * 100
    ) / 100;

  return (
    <SectionWrapper>
      <div className="space-x-4 mb-4">
        <span
          title={priceWithCurrency(
            product.prices[1].price,
            product.prices[1].currency
          )}
          className="font-black text-grey-300 text-lg  line-through"
        >
          {priceWithCurrency(
            product.prices[1].price,
            product.prices[1].currency
          )}
        </span>
        <span
          title={priceWithCurrency(
            priceWithDiscount,
            product.prices[1].currency
          )}
          className="font-black text-red-700 text-lg text"
        >
          {priceWithCurrency(priceWithDiscount, product.prices[1].currency)}
        </span>
        <span
          title={product.prices[1].discount + "%"}
          className="text-grey-300 text-md"
        >
          Discount: {product.prices[1].discount}%
        </span>
      </div>
      <ProductColors colors={props.colors} />
      <div className="flex space-x-2 mt-2">
        <AddToCart />
        <SettleButton />
      </div>
    </SectionWrapper>
  );
};

const AdditionalInfo = (props) => {
  return <SectionWrapper></SectionWrapper>;
};

const SectionWrapper = (props) => {
  return (
    <div className={"" + " " + props.className}>
      {props.children}
      <hr className="mt-2 mb-3 h-1 bg-grey-200/50" />
    </div>
  );
};
