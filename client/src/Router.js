import React from "react";
import { Routes, Route } from "react-router-dom";
import { FrontPage } from "./pages/FrontPage";
import { CataloguePage } from "./pages/CataloguePage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductPage } from "./pages/ProductPage";
import { AuthPage } from "./pages/AuthPage";
import { AccountPage } from "./pages/AccountPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import { CreatePage } from "./pages/CreatePage";
import { SearchPage } from "./pages/SearchPage";
import { ErrorPage } from "./pages/ErrorPage";

const mainPath = "";

export const Router = (props) => {
  return (
    <Routes>
      <Route path={mainPath + "/"} exact element={<FrontPage />} />
      <Route path={mainPath + "/page/:pagination"} exact element={<FrontPage />} />
      <Route path={mainPath + "/products"} exact element={<CataloguePage />} />
      <Route
        path={mainPath + "/categories/:category/:option"}
        element={<CategoryPage />}
      />
      <Route path={mainPath + "/products/:id"} element={<ProductPage />} />
      <Route path={mainPath + "/auth/:type"} element={<AuthPage />} />
      <Route path={mainPath + "/users/:id"} element={<AccountPage />} />
      <Route
        path={mainPath + "/users/:id/cart"}
        element={<ShoppingCartPage />}
      />
      <Route path={mainPath + "/users/:id/create"} element={<CreatePage />} />
      <Route path={mainPath + "/search/:search"} element={<SearchPage />} />
      <Route path={"*"} element={<ErrorPage />} />
    </Routes>
  );
};
