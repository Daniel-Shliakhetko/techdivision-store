import React, { useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Stars } from "../components/Stars";
import { useParams } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo";
import { ProductColors } from "../components/ProductColors";
import { priceWithCurrency } from "../helpers/priceWithCurrency";
import { AddToCart, SettleButton } from "../components/Button";
import { IconLabel } from "../components/IconLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faEarthAmericas,
  faPhone,
  faSignIn,
  faUserPlus,
  faCheck,
  faXmark,
  faTruck,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const testProduct = {
  title: "NONE",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi magnam sequi esse nam odio maiores error quaerat voluptatibus, voluptatum laborum culpa earum animi provident ullam nesciunt nemo? Earum, reiciendis illo.",
  date: new Date(),
  author: "8329765920347023",
  available: 45,
  delivery: true,
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
  comments: [
    {
      user: "321543432532",
      rate: 4,
      title: "Very Good product",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi magnam sequi esse nam odio maiores error quaerat voluptatibus, voluptatum laborum culpa earum animi provident ullam nesciunt nemo? Earum, reiciendis illo.",
      date: new Date(),
    },
    {
      user: "321543432532",
      rate: 4,
      title: "Very Good product",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi magnam sequi esse nam odio maiores error quaerat voluptatibus, voluptatum laborum culpa earum animi provident ullam nesciunt nemo? Earum, reiciendis illo.",
      date: new Date(),
    },
    {
      user: "321543432532",
      rate: 4,
      title: "Very Good product",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi magnam sequi esse nam odio maiores error quaerat voluptatibus, voluptatum laborum culpa earum animi provident ullam nesciunt nemo? Earum, reiciendis illo.",
      date: new Date(),
    },
  ],
};

export const ProductPage = (props) => {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState({});
  const [colors, setColors] = useState(null);
  const [brand, setBrand] = useState(null);

  axios
    .get("/api/product/get/id/" + id)
    .then((res) => {
      console.log(res.data);
      setProduct(res.data);
      setColors(
        product.categories.filter((category) => category.parent === "/color")
      );
      setBrand(
        product &&
          product.categories.find((category) => category.parent === "/brand")
      );
    })
    .catch((err) => {
      if (err.response) {
        console.error(err.response.data);
      }
    });

  return (
    <div className="px-4 md:px-12">
      {/* <BreadCrumbs objectTitle={product.title} /> */}
      <hr className="h-1 mb-1.5 bg-grey-200/50" />
      <MainInfo rating={product.rating} brand={brand}>
        {product.title}
      </MainInfo>
      {/* <Description>{product.description}</Description>
      <Payment product={product} colors={colors} prices={product.prices}></Payment>
      <AdditionalInfo
        available={product.available}
        delivery={product.delivery}
      />
      <Comments comments={product.comments} /> */}
    </div>
  );
};

const MainInfo = (props) => {
  const params = useParams();

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="font-bold text-2xl uppercase w-full md:w-1/2">
          {props.children || <Skeleton />}
        </h1>
        {props.brand ? <BrandLogo title={props.brand.title} /> : <Skeleton style={{width: "4rem", height:"4rem"}}/>}
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-2 min-w-full">
        {props.children ? <span>{`Product №: ${params.id}`}</span> : <Skeleton style={{width: "25vw", height:"1rem"}}/> }
        {props.rating ? <Stars rating={props.rating} showNumberOfVotes={true} /> : <Skeleton style={{width: "25vw", height:"1.75rem"}}/>}
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
  const { prices } = props;
  const priceWithDiscount =
    Math.floor(prices[1].price * (1 - prices[1].discount / 100) * 100) / 100;

  return (
    <SectionWrapper>
      <div className="space-x-4 mb-4">
        <span
          title={priceWithCurrency(prices[1].price, prices[1].currency)}
          className="font-black text-grey-300 text-lg  line-through"
        >
          {priceWithCurrency(prices[1].price, prices[1].currency)}
        </span>
        <span
          title={priceWithCurrency(priceWithDiscount, prices[1].currency)}
          className="font-black text-red-700 text-lg text"
        >
          {priceWithCurrency(priceWithDiscount, prices[1].currency)}
        </span>
        <span
          title={prices[1].discount + "%"}
          className="text-grey-300 text-md"
        >
          Discount: {prices[1].discount}%
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
  const availabe = props.available > 0;
  return (
    <SectionWrapper>
      <div className="flex flex-wrap justify-between">
        <IconLabel
          className={
            availabe
              ? "text-green-500 w-full md:w-1/2"
              : "text-red-700 w-full md:w-1/2"
          }
          icon={<FontAwesomeIcon icon={availabe ? faCheck : faXmark} />}
        >
          {availabe ? "Available" : "Not available"}
        </IconLabel>
        <IconLabel
          className="w-full md:w-1/2"
          icon={<FontAwesomeIcon icon={faTruck} />}
        >
          {props.delivery ? "Shipping Included" : "Paid Delivery"}
        </IconLabel>
        <IconLabel
          className="w-full md:w-1/2"
          icon={<FontAwesomeIcon icon={faPhone} />}
        >
          CHANGE TO AUTHOR PHONE
        </IconLabel>
        <IconLabel
          className="w-full md:w-1/2"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        >
          CHANGE TO AUTHOR EMAIL
        </IconLabel>
      </div>
    </SectionWrapper>
  );
};

const Comments = (props) => {
  const comments = props.comments;
  return (
    <SectionWrapper>
      <h2 className="font-bold text-lg uppercase mb-6">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment, i) => (
          <Comment key={i} comment={comment} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const Comment = (props) => {
  const comment = props.comment;
  return (
    <div className="comment">
      <h3 className="font-bold text-md">{comment.title}</h3>
      <p>{comment.description}</p>
      <Stars rate={comment.rate} />
      <span className="text-grey-300">
        Posted on: {new Date(comment.lastUpdatedAt).toUTCString()}
      </span>
    </div>
  );
};

const WriteComment = (props) => {
  return (
    <SectionWrapper>
      <h2 className="font-bold text-lg uppercase">Comments</h2>
    </SectionWrapper>
  );
};

const Gallery = (props) => {
  return (
    <SectionWrapper>
      <h2 className="font-bold text-lg uppercase">Comments</h2>
    </SectionWrapper>
  );
};

const AdditionalDescriptions = (props) => {
  return (
    <SectionWrapper>
      <h2 className="font-bold text-lg uppercase">Comments</h2>
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
