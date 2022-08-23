import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../images/techdivision-logo.png";

export const AuthPage = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const isLogin = params.type === "login";

  return (
    <div className="w-full h-screen flex justify-center items-center p-4 relative">
      <button className="absolute top-8 left-0 w-full flex justify-center" onClick={()=>navigate('/')}>
        <img className="h-16" src={logo} alt="Logo"/>
      </button>
      {isLogin ? (
        <form class="bg-grey-100 rounded-lg py-6 px-4 flex flex-col justify-center space-y-1 w-full sm:w-72 mb-12">
          <h1 className="text-center text-3xl font-bold uppercase mb-4 text-gray-500">
            Login
          </h1>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          />
          <input
            type="submit"
            name="submit"
            value="Login"
            className="bg-grey-200 rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1 uppercase text-gray-500 font-semibold"
          />
        </form>
      ) : (
        <form class="bg-grey-100 rounded-lg py-6 px-4 flex flex-col justify-center space-y-1 w-full sm:w-72">
          <h1 className="text-center text-3xl font-bold uppercase mb-4 text-gray-500">
            Registration
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          />
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          />
          <input
            type="password"
            name="password"
            placeholder="Repeat your password"
            className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          />
          <input
            type="submit"
            name="submit"
            value="Login"
            className="bg-grey-200 rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1 uppercase text-gray-500 font-semibold"
          />
        </form>
      )}
    </div>
  );
};
