import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Signup = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(AuthContext);

  // State for form fields
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for loading status
  const [isLoading, setIsLoading] = useState(false);

  // Input change handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
        .replace(/\s+/g, " ") 
        .trim(),
    });
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Validation: Password Match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const url = import.meta.env.VITE_SERVER_URL;

      // 2. Signup API Call
      const { confirmPassword, ...signupBody } = form;
      const res = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupBody),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Something went wrong while creating account!");
        setIsLoading(false);
        return;
      }

      // 3. Auto-Login API Call (After successful signup)
      const loginBody = { email: form.email, password: form.password };
      const loginRes = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginBody), // 'body' must be lowercase
        credentials: "include",
      });

      const loginData = await loginRes.json();

      if (loginData.success) {
        // Save user ID to localStorage
        const user = loginData?.data;
        const id = loginData.data?.id || loginData.userId;
        localStorage.setItem("id", JSON.stringify(id));
        setUserInfo(user);
        // setIsLoading(false)
        navigate("/");
      } else {
        // If auto-login fails, send them to login page
        alert("Account created! Please login manually.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Network error or server is down. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Signup Card */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">
            Join us today! It only takes a minute.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              onChange={inputHandler}
            />
          </div>

          {/* Email Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="name@company.com"
              onChange={inputHandler}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              required
              minLength={6}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              onChange={inputHandler}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              required
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                form.confirmPassword && form.password !== form.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••••••"
              onChange={inputHandler}
            />
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-4 py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 ${
              isLoading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 shadow-lg active:scale-95"
            }`}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-purple-600 hover:text-purple-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
