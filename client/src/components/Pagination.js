import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

export const Pagination = (props) => {
  const params = useParams();
  const pagination = +params.pagination || 1;
  const location = useLocation();
  const navigate = useNavigate();

  const { products, itemsPerPage, showNumber, showEdgesNumber } = props;
  const min = 1;
  const max = Math.ceil(products.length / itemsPerPage);

  const getCurrentContents = () => {
    return products
      .slice(itemsPerPage * (pagination - 1), itemsPerPage * pagination)
      .map((product, i) => <ProductCard key={i} product={product} />);
  };

  const paginationButton = (action) => {
    let path = location.pathname.slice();
    let mainPath = "";

    if (path.includes("/page/")) {
    } else {
      mainPath = "/page";
    }
    navigate(
      action === 1
        ? "/"
        : mainPath + path.replace(pagination.toString(), "") + action
    );
  };
  const getShowNumbers = () => {
    let answer = [];
    if (showEdgesNumber) {
      answer.push(min);
      answer.push(max);
    }
    for (let i = 0; i < showNumber; i++) {
      let step = i + 1;
      pagination - step > min &&
        !answer.includes(pagination - step) &&
        answer.push(pagination - step);
      pagination + step < max &&
        !answer.includes(pagination + step) &&
        answer.push(pagination + step);
    }
    !answer.includes(pagination) && answer.push(pagination);
    return answer.sort(function (a, b) {
      if (a === Infinity) return 1;
      else if (isNaN(a)) return -1;
      else return a - b;
    });
  };

  const canPlaceDots = (number, isLast) => {
    if (isLast) {
      return number + showNumber < max - 1
    }
    else{
      return number - showNumber < 0
    }
  };

  // console.log(products.length / itemsPerPage);

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full flex flex-col md:flex-row flex-wrap bg-grey-200 sm:px-20 sm:py-12">
        {getCurrentContents()}
      </div>
      <div className="pagination flex space-x-2 mx-auto">
        {pagination > 1 && (
          <button
            onClick={() => {
              paginationButton(pagination - 1);
            }}
          >
            &#10094;
          </button>
        )}
        {getShowNumbers().map((number, i) => (
          <>
            {i===getShowNumbers().length-1 && canPlaceDots(number, true) && <span>...</span>}
            <button
              onClick={() => {
                paginationButton(number);
              }}
              className={
                number === pagination
                  ? "text-red-600 font-bold"
                  : number === min
                  ? "text-red-800 font-bold"
                  : number === max
                  ? "text-red-800 font-bold"
                  : "font-bold"
              }
              key={i}
            >
              {number}
            </button>
            {i===0 && canPlaceDots(number, false) && <span>...</span>}
          </>
        ))}
        {pagination <= products.length / itemsPerPage && (
          <button
            onClick={() => {
              paginationButton(pagination + 1);
            }}
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};
