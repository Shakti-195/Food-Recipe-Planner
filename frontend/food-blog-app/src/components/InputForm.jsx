import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Inputform({ setIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = "https://food-recipe-planner.onrender.com";

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp ? "signUp" : "login";

    try {
      const res = await axios.post(`${API_URL}/${endpoint}`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsOpen();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-md">

      <div className="text-center mb-8">

        <h2 className="text-3xl font-bold text-orange-500">
          {isSignUp ? "Create Account 🍽️" : "Welcome Back 👋"}
        </h2>

        <p className="text-gray-500 mt-2">
          {isSignUp
            ? "Create your account to start sharing recipes."
            : "Login to continue your cooking journey."}
        </p>

      </div>

      <form
        onSubmit={handleOnSubmit}
        className="space-y-5"
      >

        {/* Email */}

        <div>

          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>

          <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500">

            <FaEnvelope className="text-gray-400 mr-3" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>

          <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500">

            <FaLock className="text-gray-400 mr-3" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-100 text-red-600 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        {/* Button */}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg"
        >
          {isSignUp ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}

        <div className="text-center">

          <button
            type="button"
            onClick={() => {
              setError("");
              setIsSignUp((prev) => !prev);
            }}
            className="text-orange-500 hover:underline font-medium"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>

        </div>

      </form>

    </div>
  );
}