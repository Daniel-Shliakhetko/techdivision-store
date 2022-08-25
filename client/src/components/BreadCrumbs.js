import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const productsData = { title: "Products", slug: "/products" };
const usersData = { title: "User", slug: "/users" };
const categoriesData = { title: "Categories", slug: "/categories" };

export const BreadCrumbs = (props) => {
  const { objectTitle } = props;
  const location = useLocation();
  const params = useParams();

  const currentData = () => {
    if (location.pathname.includes(productsData.slug)) return productsData;
    if (location.pathname.includes(usersData.slug)) return usersData;
    if (location.pathname.includes(categoriesData.slug)) return categoriesData;
    return null;
  };
  
  const data = currentData();

  return (
    <p className="breadcrumbs mt-6 mb-2 text-center">
      <Link to="/">Main</Link>

      {data && (
        <>
          &nbsp;/&nbsp;<Link to={data.slug}>{data.title}</Link>
        </>
      )}
      {data && objectTitle && !!params.id && (
        <>
          &nbsp;/&nbsp;<Link to={`${data.slug}/${params.id}`}>{objectTitle}</Link>
        </>
      )}
    </p>
  );
};
