import React, { useState, useEffect } from "react";
import { Pagination } from "../components/Pagination";
import axios from "axios";

// const product = {
//   title: "Bluse",
//   colors: [
//     { name: "Black", color: "#201f1d" },
//     { name: "Gray", color: "#a19c96" },
//     { name: "Brown Yellow", color: "#b39468" },
//     { name: "White", color: "#e5e4df" },
//   ],
//   prices: [
//     { currency: "usd", price: 27.95 },
//     { currency: "eur", price: 25.95 },
//     { currency: "rub", price: 1999.95 },
//     { currency: "uah", price: 999.95 },
//   ],
//   rating: [
//     { rate: 1, votes: 445 },
//     { rate: 2, votes: 44 },
//     { rate: 3, votes: 130 },
//     { rate: 4, votes: 534 },
//     { rate: 5, votes: 245 },
//   ],
// };

// for (let i = 0; i < 27; i++) {
//   products.push({...product});
//   products[i].title = products[i].title + " " + (i + 1);
// }

export const FrontPage = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => async () => {
    const productsRes = await fetch("/api/product/get-products", {
      method: "GET",
    });
    if (productsRes) {
      setProducts(await productsRes.json());
    }
    else {
      getProducts();
    }
  }, []);

  const getProducts = () => async () => {
    const productsRes = await fetch("/api/product/get-products", {
      method: "GET",
    });
    if (productsRes) {
      setProducts(await productsRes.json());
    }
    else {
      getProducts();
    }
  };
  
  return (
    <Pagination
      products={products}
      itemsPerPage={2}
      showNumber={2}
      showEdgesNumber={true}
    />
  );
};
