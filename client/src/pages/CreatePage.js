import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const CreatePage = (props) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    createdAt: "",
    lastUpdatedAt: "",
    author: "",
    available: "",
    delivery: "",
    prices: [],
    categories: [],
    comments: [],
  });
  const [prices, setPrices] = useState([
    { currency: "usd", price: null, discount: null },
    { currency: "eur", price: null, discount: null },
    { currency: "rub", price: null, discount: null },
    { currency: "uah", price: null, discount: null },
  ]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [file, setFile] = useState(null);

  const params = useParams();

  const getCategories = () => async () => {
    try {
      const parentCategoriesRes = await axios.get(
        "/api/category/get/main/childrens"
      );
      if (parentCategoriesRes) {
        const answer = [];
        parentCategoriesRes.data.map(async (parentCategory, i) => {
          const categoriesRes = await axios.get(
            "/api/category/get" + parentCategory.category + "/childrens"
          );
          if (categoriesRes) {
            console.log(categoriesRes.data);
            const currentCategory = {
              ...parentCategoriesRes.data[i],
              childrens: categoriesRes.data,
            };
            // console.log(typeof currentCategory);
            answer.push(currentCategory);
            if (i === parentCategoriesRes.data.length - 1) {
              setParentCategories(answer);
            }
          }
        });
        console.log(answer);
      }
    } catch (e) {
      console.log(e);
      getCategories();
    }
  };

  const handleChange = (e) => {
    let check = null;
    if (e.target.type === "checkbox") {
      check = e.target.checked;
    }
    setForm({ ...form, [e.target.name]: check || e.target.value });
  };

  const handleChangePrices = (e) => {
    const id = e.target.dataset.id;
    let price = { ...prices[id] };
    price = { ...price, [e.target.name]: e.target.value };
    let newPrices = [...prices];
    newPrices[id] = price;
    setPrices(newPrices);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      title: form.title,
      description: form.description,
      createdAt: Date.now(),
      lastUpdatedAt: Date.now(),
      author: params.id,
      available: form.available,
      delivery: form.delivery,
      prices: prices
        .map((price) => price.price && price)
        .filter((element) => {
          return element !== null;
        }),
      categories: [],
      comments: [],
    };
    setLoading(true);
    setError(null);

    console.log(product);

    axios
      .post("/api/product/add", product)
      .then((res) => {
        setLoading(false);
        // navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.error(err.response.data);
          setError(
            err.response.data.errors
              ? err.response.data.errors[0].msg
              : err.response.data.message
          );
        }
      });
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("file", file);

    console.log(file);

    axios
      .post("/upload", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getCategories, []);

  return (
    <div className="p-8">
      <form
        className="bg-grey-100 rounded-lg py-6 px-4 flex flex-col justify-center space-y-1 w-full h-full sm:w-72 mb-12"
        style={{ width: "100%" }}
        onSubmit={handleSubmitFile}
      >
        <h1 className="text-center text-3xl font-bold uppercase mb-4 text-gray-500">
          Add Images
        </h1>
        <input
          type="file"
          name="file"
          placeholder="Enter product title"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={handleChangeFile}
        />
        <button
          type="submit"
          className={
            !loading
              ? "bg-grey-200 rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1 uppercase text-gray-500 font-semibold"
              : "bg-grey-300 rounded-sm border-grey-400 outline-grey-400 outline-2 border p-1 uppercase text-gray-700 font-semibold"
          }
          disabled={loading}
        >
          ADD Images
        </button>
      </form>
      <form
        className="bg-grey-100 rounded-lg py-6 px-4 flex flex-col justify-center space-y-1 w-full h-full sm:w-72 mb-12"
        style={{ width: "100%" }}
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-bold uppercase mb-4 text-gray-500">
          Add Product
        </h1>
        <input
          type="text"
          name="title"
          placeholder="Enter product title"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Enter product description"
          rows="3"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={handleChange}
        />
        <input
          type="number"
          name="available"
          placeholder="Enter product number"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={handleChange}
        />
        <div>
          <input
            type="checkbox"
            name="delivery"
            id="delivery"
            className="delivery"
            onChange={handleChange}
          />
          <label className="ml-2 text-grey-400">Delivery included</label>
        </div>
        <div className="rounded-lg bg-gray-400/25 p-4 space-y-6">
          <h2 className="text-center text-xl font-bold uppercase mb-4 text-gray-500">
            Prices
          </h2>
          {prices.map((price, i) => (
            <div
              className="flex w-full space-y-2 md:space-y-0 md:space-x-4 md:flex-row flex-col"
              key={i}
            >
              <div>
                <label className="font-black text-grey-400 font-xl uppercase w-10 mr-2">
                  {price.currency}
                </label>
                <input
                  data-id={i}
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
                  onChange={handleChangePrices}
                />
              </div>
              <div className="space-x-2">
                <label className="font-black text-grey-400 font-xl">
                  Discount:
                </label>
                <input
                  data-id={i}
                  type="number"
                  name="discount"
                  placeholder="Enter product discount"
                  className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
                  onChange={handleChangePrices}
                />
                <label className="font-black text-grey-400 font-xl">%</label>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-gray-400/25 p-4 space-y-6">
          <h2 className="text-center text-xl font-bold uppercase mb-4 text-gray-500 w-full">
            Categories
          </h2>
          {parentCategories.map(
            (parentCategory, i) =>
              parentCategory.title && (
                <div className="flex w-full space-y-2 flex-col" key={i}>
                  <h3 className="text-center text-lg font-bold uppercase mb-4 text-gray-500 w-full">
                    {parentCategory.title}
                  </h3>
                  {parentCategory.childrens &&
                    parentCategory.childrens.map((category, i) => {
                      if (category.data.color) {
                        return (
                          <div className="flex items-center flex-row space-x-2">
                            <input
                              key={i}
                              type="checkbox"
                              name="price"
                              placeholder={"Enter product " + category.title}
                              className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
                              onChange={handleChangePrices}
                            />
                            <label className="font-black text-grey-400 font-xl uppercase w-10 mr-2">
                              {category.title}
                            </label>
                            <div
                              className="h-5 w-5 relative border border-grey-200/75"
                              style={{ backgroundColor: category.data.color }}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <input
                            key={i}
                            type="number"
                            name="price"
                            placeholder={"Enter product " + category.title}
                            className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
                            onChange={handleChangePrices}
                          />
                        );
                      }
                    })}
                </div>
              )
          )}
        </div>
        <button
          type="submit"
          className={
            !loading
              ? "bg-grey-200 rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1 uppercase text-gray-500 font-semibold"
              : "bg-grey-300 rounded-sm border-grey-400 outline-grey-400 outline-2 border p-1 uppercase text-gray-700 font-semibold"
          }
          disabled={loading}
        >
          Add Product
        </button>
        {error && (
          <div className="rounded-sm border-red-400 text-red-800 bg-red-200 border p-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};
