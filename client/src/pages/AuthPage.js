import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../images/techdivision-logo.png";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = (props) => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const isLogin = params.type === "login";

  return (
    <div className="w-full h-screen flex justify-center items-center p-4 relative">
      <button
        className="absolute top-8 left-0 w-full flex justify-center"
        onClick={() => navigate("/")}
      >
        <img className="h-16" src={logo} alt="Logo" />
      </button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
};

const Login = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: form.email,
      password: form.password,
    };
    setLoading(true);
    setError(null);

    axios
      .post("/api/auth/login", user)
      .then((res) => {
        setLoading(false);
        auth.login(res.data.token, res.data.userId);
        navigate("/");
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
    <form
      className="bg-grey-100 rounded-lg py-6 px-4 flex flex-col justify-center space-y-1 w-full sm:w-72 mb-12"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-3xl font-bold uppercase mb-4 text-gray-500">
        Login
      </h1>
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
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
        Login
      </button>
      {error && (
        <div className="rounded-sm border-red-400 text-red-800 bg-red-200 border p-2">
          {error}
        </div>
      )}
    </form>
  );
};

const Register = (props) => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isPassword = form.password === form.passwordRepeat;

    const user = {
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      isPassword: isPassword,
    };

    setLoading(true);
    setError(null);

    axios
      .post("/api/auth/register", user)
      .then((res) => {
        setLoading(false);

        console.log(res);
        console.log(res.data);
        navigate("/auth/login");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
          setError(
            err.response.data.errors
              ? err.response.data.errors[0].msg
              : err.response.data.message
          );
        }
      });
  };

  return (
    <form
      className="bg-grey-100 rounded-lg py-6 px-4 flex flex-col justify-center space-y-1 w-full sm:w-72"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-3xl font-bold uppercase mb-4 text-gray-500">
        Registration
      </h1>

      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Enter your last name"
        className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Enter your email"
        className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
        onChange={handleChange}
      />
      <input
        type="password"
        name="passwordRepeat"
        placeholder="Repeat your password"
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
        Reigster
      </button>
      {error && (
        <div className="rounded-sm border-red-400 text-red-800 bg-red-200 border p-2">
          {error}
        </div>
      )}
    </form>
  );
};
