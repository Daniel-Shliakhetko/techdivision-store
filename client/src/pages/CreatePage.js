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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      prices: [],
      categories: [],
      comments: [],
    };
    setLoading(true);
    setError(null);

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
          console.error(err.response.status);
          console.error(err.response.headers);
          setError(err.response.data.message);
        }
      });
  };

  return (
    <div className="p-8">
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
                <input
          type="checkbox"
          name="delivery"
          placeholder="Enter product delivery"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={handleChange}
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