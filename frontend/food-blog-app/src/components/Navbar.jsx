import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import InputForm from "./InputForm";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [isOpen]);

  const isLogin = !token;

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken(null);
      setUser(null);

      window.location.href = "/";
    } else {
      setIsOpen(true);
    }
  };

  const linkClass = ({ isActive }) =>
  `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
    isActive
      ? "bg-slate-900 text-white shadow-md"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <NavLink
            to="/"
            className="text-3xl font-extrabold text-slate-900 tracking-tight"
          >
            🍽️ RecipeVerse
          </NavLink>

          {/* Navigation */}
          <nav className="flex items-center gap-4">

            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            <NavLink
              to={!isLogin ? "/myRecipe" : "/"}
              className={linkClass}
              onClick={() => isLogin && setIsOpen(true)}
            >
              My Recipes
            </NavLink>

            <NavLink
              to={!isLogin ? "/favRecipe" : "/"}
              className={linkClass}
              onClick={() => isLogin && setIsOpen(true)}
            >
              Favorites
            </NavLink>

            <button
              onClick={checkLogin}
              className="ml-4 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isLogin
                ? "Login"
                : `Logout (${user?.email})`}
            </button>

          </nav>
        </div>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}