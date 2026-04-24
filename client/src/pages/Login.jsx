import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputHandler = (e) => {
    const eleName = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [eleName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        alert(data.message || "Something went wrong while logged in");
        setForm({
          email: "",
          password: "",
        });
        return;
      }
      console.log(data.name, data.email);

      const id = data.data.id;

      localStorage.setItem("id", JSON.stringify(id));

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Please enter your details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="name@company.com"
              name="email"
              value={form.email}
              onChange={inputHandler}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              name="password"
              value={form.password}
              onChange={inputHandler}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-semibold text-purple-600 hover:text-purple-500"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 ${
              isLoading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 shadow-lg active:scale-95"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Social Login (Optional) */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="h-5 w-5 mr-2"
                alt="Google"
              />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <img
                src="https://www.svgrepo.com/show/331393/facebook.svg"
                className="h-5 w-5 mr-2"
                alt="FB"
              />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-purple-600 hover:text-purple-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
