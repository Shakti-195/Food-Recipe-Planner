import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";

export default function Inputform({ setIsOpen }) {
  const [name, setName] = useState("");
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
  ...(isSignUp && { name }),
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
         <div className="flex justify-center mb-6">
    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg">
      {/* <MdRestaurantMenu className="text-4xl text-emerald-600" /> */}
      <FaUserCircle className="text-5xl text-emerald-600" />
    </div>
     
  </div>
  <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">
       Recipe Verse
    </p>

        <h2 className="text-4xl font-extrabold text-slate-900">
          {isSignUp ? " Join  Recipe Verse " : "Welcome Back"}
        </h2>

        <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>

        <p className="text-slate-500 mt-3">
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
            {isSignUp && (
  <div>
    <label className="block text-slate-800 font-semibold mb-2">
      Full Name
    </label>

    <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-200">

      <FaUserCircle className="text-slate-400 mr-3" />

      <input
        type="text"
        placeholder="Enter your full name"
        className="w-full bg-transparent outline-none placeholder:text-slate-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={isSignUp}
      />

    </div>
  </div>
)}

          <label className="block text-slate-800 font-semibold mb-2">
            Email
          </label>

          <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-200">

            <FaEnvelope className="text-slate-400 mr-3" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="block text-slate-800 font-semibold mb-2">
            Password
          </label>

          <div className="flex items-center rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-200">

            <FaLock className="text-slate-400 mr-3" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-500 hover:text-slate-800 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
           ⚠ {error}
          </div>
        )}

        {/* Button */}

        <button
  type="submit"
  className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
>
  {isSignUp ? (
    <>
      <FaUserPlus className="text-lg" />
      Create Account
    </>
  ) : (
     <>
      <FaSignInAlt className="text-lg" />
      Sign In
    </>
  )}
</button>
        {/* Toggle */}

        <div className="text-center">

          <button
            type="button"
            onClick={() => {
  setError("");
  setName("");
  setEmail("");
  setPassword("");
  setIsSignUp((prev) => !prev);
}}
            className="text-emerald-600 hover:text-emerald-700 font-semibold transition"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>

        </div>

      </form>

    </div>
  );
}