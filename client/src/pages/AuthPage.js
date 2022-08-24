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

    axios
      .post("/api/auth/login", user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        auth.login(res.data.token, res.data.userId);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
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
        className="bg-grey-200 rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1 uppercase text-gray-500 font-semibold"
      >
        Login
      </button>
    </form>
  );
};

class Register extends React.Component {
  state = {
    name: "",
    lastName: "",
    email: "",
    password: "",
  };

  handleChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/api/auth/register", user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        }
      });
  };
  render() {
    return (
      <form
        className="bg-grey-100 rounded-lg py-6 px-4 flex flex-col justify-center space-y-1 w-full sm:w-72"
        onSubmit={this.handleSubmit}
      >
        <h1 className="text-center text-3xl font-bold uppercase mb-4 text-gray-500">
          Registration
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Enter your lastname"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="passwordRepeat"
          placeholder="Repeat your password"
          className="rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1"
        />
        <button
          type="submit"
          className="bg-grey-200 rounded-sm border-grey-300 outline-grey-300 outline-2 border p-1 uppercase text-gray-500 font-semibold"
        >
          Reigster
        </button>
      </form>
    );
  }
}
