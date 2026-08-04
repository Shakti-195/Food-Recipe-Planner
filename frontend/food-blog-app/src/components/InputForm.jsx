import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";

export default function Inputform({ setIsOpen, message }) {
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

const redirectRecipe = localStorage.getItem("redirectRecipe");

setIsOpen();

if (redirectRecipe) {
  localStorage.removeItem("redirectRecipe");

  window.location.href = `/recipe/${redirectRecipe}`;
} else {
  window.location.reload();
}
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-md px-2 sm:px-0">

      <div className={`text-center ${isSignUp ? "mb-0" : "mb-8"}`}>
         <div className="flex justify-center mb-4">
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-100 dark:bg-emerald-100 flex items-center justify-center shadow-lg">
      {/* <MdRestaurantMenu className="text-4xl text-emerald-600" /> */}
     <FaUserCircle className="text-4xl md:text-5xl text-emerald-600" />
    </div>
     
  </div>
  
<div className="mt-3 mb-2 flex items-center justify-center gap-1.5">
  <MdRestaurantMenu className="text-[22px] text-emerald-500 flex-shrink-0" />

  <p className="text-sm font-bold tracking-wide text-slate-900 dark:text-white">
    Recipe<span className="text-emerald-500">Verse</span>
  </p>
</div>
 <h2
  className={`mt-4 font-extrabold text-slate-900 dark:text-white transition-colors duration-300 ${
    isSignUp
      ? "text-3xl md:text-4xl"
      : "text-4xl md:text-5xl"
  }`}
>
  {isSignUp ? "Create Account" : "Welcome Back"}
</h2>
{message && !isSignUp && (
  <div className="mt-5 mx-auto max-w-sm rounded-2xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 flex items-center gap-3">
    <MdRestaurantMenu className="text-emerald-500 text-2xl flex-shrink-0" />

    <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium text-left">
      {message}
    </p>
  </div>
)}

        <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>

        <p className="text-slate-500 dark:text-slate-400 mt-3 transition-colors duration-300">
          {isSignUp
            ? "Create your account to start sharing recipes."
            : "Login to continue your cooking journey."}
        </p>

      </div>

      <form
  onSubmit={handleOnSubmit}
  className={isSignUp ? "space-y-4" : "space-y-5"}
>
        {/* Email */}

        <div>
            {isSignUp && (
  <div>
    <label className="block text-slate-800 dark:text-slate-200 font-semibold mb-2 transition-colors duration-300">
      Full Name
    </label>

   <div className="flex items-center rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-3 md:px-4 py-2.5 transition-all duration-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 dark:focus-within:ring-emerald-500/30">

      <FaUserCircle className="text-slate-400 mr-3" />

      <input
        type="text"
        placeholder="Enter your full name"
        className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={isSignUp}
      />

    </div>
  </div>
)}

          <label className="block text-slate-800 dark:text-slate-200 font-semibold mb-2 transition-colors duration-300">
            Email
          </label>

          <div className="flex items-center rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-3 md:px-4 py-2.5 transition-all duration-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 dark:focus-within:ring-emerald-500/30">

            <FaEnvelope className="text-slate-400 mr-3" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="block text-slate-800 dark:text-slate-200 font-semibold mb-2 transition-colors duration-300">
            Password
          </label>

         <div className="flex items-center rounded-2xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-3 md:px-4 py-2.5 transition-all duration-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 dark:focus-within:ring-emerald-500/30">

            <FaLock className="text-slate-400 mr-3" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/40 p-3 text-sm text-red-600 dark:text-red-400 transition-colors duration-300">
           ⚠ {error}
          </div>
        )}

        {/* Button */}

        <button
  type="submit"
className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white py-2.5 md:py-4 text-base md:text-lg rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
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
            className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 font-semibold transition-all duration-300"
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