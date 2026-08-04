import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { MdRestaurantMenu } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

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
// desktop-version
const linkClass = ({ isActive }) =>
  `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
    isActive
      ? "bg-emerald-500 text-white shadow-md"
      : "text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800"
  }`;

  // mobile version
const mobileLinkClass = ({ isActive }) =>
  `flex w-full items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
    isActive
      ? "bg-slate-900 dark:bg-emerald-500 text-white border-l-2 border-emerald-400"
      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
  }`;
  return (
    <>
   <header
  className={`sticky top-0 ${
    mobileMenu ? "z-0" : "z-50"
  } bg-white/90 dark:bg-slate-950 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm`}
>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
      <NavLink
  to="/"
  className="flex items-center gap-2 transition-colors duration-300"
>
  <MdRestaurantMenu className="text-[34px] text-emerald-500 flex-shrink-0" />

  <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
    Recipe
    <span className="text-emerald-500">Verse</span>
  </span>
</NavLink>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-4">

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
  className={({ isActive }) =>
    `group px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-emerald-500 text-white shadow-md"
        : "text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`
  }
>
  <span className="flex items-center gap-2">
    <FaRegHeart className="text-sm transition-colors duration-300 group-hover:text-emerald-500" />
    Favorites
  </span>
</NavLink>

            <ThemeToggle />
            <button
              onClick={checkLogin}
              className="ml-4 bg-slate-900 dark:bg-emerald-500 hover:bg-slate-800 dark:hover:bg-emerald-600 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isLogin
                ? "Login"
                : `Logout (${user?.name})`}
            </button>

            

          </nav>
          <button
  onClick={() => setMobileMenu(true)}
  className="lg:hidden text-slate-800"
>
  <HiOutlineMenuAlt3 className="text-4xl" />
</button>
        </div>
      </header>
      <>
   {mobileMenu && (
  <div
    onClick={() => setMobileMenu(false)}
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
  ></div>
)}

    <div
  className={`fixed top-0 right-0 h-screen w-[320px] max-w-[85vw]
  bg-white dark:bg-slate-950 shadow-2xl z-[100]
  p-5 overflow-y-auto
  transform transition-transform duration-300 ease-in-out
  ${mobileMenu ? "translate-x-0" : "translate-x-full"}`}
>
<div className="flex justify-between items-center mb-5">

 <div className="flex items-center gap-2">
  <MdRestaurantMenu className="text-[30px] text-emerald-500" />

  <span className="font-extrabold tracking-tight text-2xl text-slate-900 dark:text-white">
    Recipe
    <span className="font-extrabold text-emerald-500">
      Verse
    </span>
  </span>
</div>

  <button onClick={() => setMobileMenu(false)}>
    <IoClose className="text-2xl text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition" />
  </button>

</div>

{!isLogin && (
  <div className="mb-5 rounded-xl bg-emerald-50 dark:bg-slate-900 border border-emerald-100 dark:border-slate-700 p-3">
    <p className="text-xs uppercase tracking-widest text-emerald-600">
      Welcome
    </p>

    <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
      {user?.name}
    </p>

    <p className="text-xs text-slate-400 break-all leading-5">
      {user?.email}
    </p>
  </div>
)}

  <div className="flex flex-col gap-2">

 <NavLink
  to="/"
  className={mobileLinkClass}
  onClick={() => setMobileMenu(false)}
>
  <FaHome className="w-5 h-5 flex-shrink-0 " />
  <span>Home</span>
</NavLink>

  <NavLink
  to={!isLogin ? "/myRecipe" : "/"}
  className={mobileLinkClass}
  onClick={() => {
    setMobileMenu(false);
    if (isLogin) setIsOpen(true);
  }}
>
  <MdRestaurantMenu className="w-5 h-5 flex-shrink-0" />
  <span>My Recipes</span>
</NavLink>

   <NavLink
  to={!isLogin ? "/favRecipe" : "/"}
  className={mobileLinkClass}
  onClick={() => {
    setMobileMenu(false);
    if (isLogin) setIsOpen(true);
  }}
>
  <FaHeart className="w-5 h-5 flex-shrink-0 " />
  <span>Favourites</span>
</NavLink>

<button
  onClick={toggleTheme}
  className="flex w-full items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-300 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
>
  {darkMode ? (
    <RiSunLine className="w-5 h-5 text-emerald-500" />
  ) : (
    <RiMoonClearLine className="w-5 h-5 text-emerald-500" />
  )}

  <span>
    {darkMode ? "Light Mode" : "Dark Mode"}
  </span>
</button>

    <button
      onClick={() => {
        setMobileMenu(false);
        checkLogin();
      }}
      className="mt-4 w-full bg-slate-900 dark:bg-slate-800 hover:bg-black dark:hover:bg-slate-700 hover:bg-black text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
    >
       <FiLogOut />
      {isLogin ? "Login" : "Logout"}
    </button>

  </div>

</div>
</>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}