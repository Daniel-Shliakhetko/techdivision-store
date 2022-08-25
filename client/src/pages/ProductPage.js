import React from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Stars } from "../components/Stars";
import { useParams } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo";

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
    { currency: "usd", price: 27.95 },
    { currency: "eur", price: 25.95 },
    { currency: "rub", price: 1999.95 },
    { currency: "uah", price: 999.95 },
  ],
  rating: [
    { rate: 1, votes: 415 },
    { rate: 2, votes: 44 },
    { rate: 3, votes: 130 },
    { rate: 4, votes: 534 },
    { rate: 5, votes: 245 },
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
      category: "/color/gray",
      title: "Gray",
      description: "There are all gray products",
      data: "#a19c96",
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
};

export const ProductPage = (props) => {
  return (
    <div className="px-2 md:px-12">
      <BreadCrumbs objectTitle={product.title} />
      <hr className="h-1 mb-1.5 bg-grey-200/50" />
      <MainInfo rating={product.rating} logo={product.logo}>
        {product.title}
      </MainInfo>
      <Description>{product.description}</Description>
    </div>
  );
};

const MainInfo = (props) => {
  const params = useParams();

  const brand = product.categories.find(
    (category) => category.parent === "/brand"
  );

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="font-bold text-2xl uppercase">{props.children}</h1>
        <BrandLogo
          title={brand.title}
        />
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

const SectionWrapper = (props) => {
  return (
    <div className={"" + " " + props.className}>
      {props.children}
      <hr className="mt-2 mb-3 h-1 bg-grey-200/50" />
    </div>
  );
};
