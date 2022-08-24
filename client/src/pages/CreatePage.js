import React from "react";

export const CreatePage = (props) => {
  return (
    <div className="p-8">
      <form
      className="bg-grey-100 rounded-lg py-6 px-4 flex flex-col justify-center space-y-1 w-full h-full sm:w-72 mb-12"
      style={{width:"100%"}}
      onSubmit={"1"}
    >
      <h1 className="text-center text-3xl font-bold uppercase mb-4 text-gray-500">
        Add Product
      </h1>
      <input
        type="text"
        name="name"
        placeholder="Enter product name"
        className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
        onChange={"1"}
      />
      <button
        type="submit"
        className="bg-grey-200 rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1 uppercase text-gray-500 font-semibold"
      >
        Add Product
      </button>
    </form>
    </div>
  );
};
