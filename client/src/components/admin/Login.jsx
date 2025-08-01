import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  // state for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Updates form data state when user types in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // get axios instance and setToken function from AppContext
  const { axios, setToken } = useAppContext();

  // handle form submision
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // make login request to server
      const { data } = await axios.post("/api/admin/login", formData);

      // check if login was successful
      if (data.success) {
        // set token
        setToken(data.token);

        // set token in localstorage
        localStorage.setItem("token", data.token);

        // set default authorization header for axios requests
        axios.defaults.headers.common["Authorization"] = data.token;
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      // show error message and log error in dev environment
      if (import.meta.env.VITE_NODE_ENV === "development") {
        toast.error(err.message);
        console.log(err);
      } else {
        // show generic error message to user
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-full max-w-sm p-6 max-md:m-6  border border-primary/10 shad
  xl shadow-primary/15 rounded-4xl shadow-2xl"
      >
        <div className="w-full flex flex-col items-center justify-center  ">
          {/* title and subtitle */}
          <div className="w-full py-6 text-center text-zinc-500">
            <h1 className="text-3xl font-bold text-zinc-800">
              <span
                className="text-primary/90
                "
              >
                Admin{" "}
              </span>
              Login
            </h1>
            <p className="mt-2">
              Enter you credentials to access the <br /> admin panel
            </p>
          </div>
          {/* login form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col ">
              <label>Email</label>
              <input
                onChange={handleChange}
                value={formData.email || ""}
                name="email"
                type="text"
                required
                placeholder="your email id"
                className="border-b-2  border-gray-200 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={handleChange}
                value={formData.password || ""}
                name="password"
                type="password"
                required
                placeholder="your password "
                className="border-b-2  border-gray-200 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer px-6 sm:px-10 py-2 text-white rounded-full bg-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
