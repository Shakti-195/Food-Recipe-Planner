import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import foodRecipe from "../assets/cholebhature.jpg";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";
import RecipeItems from "../components/RecipeItems";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { RiBookOpenLine } from "react-icons/ri";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Reference to recipe section
  const recipeSectionRef = useRef(null);

  // Auto scroll for My Recipes & Favorites
  useEffect(() => {
    if (location.pathname !== "/") {
      setTimeout(() => {
        recipeSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location.pathname]);

  const addRecipe = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/addRecipe");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-6 md:py-12 lg:py-20 px-4 bg-white dark:bg-slate-950 transition-all duration-300">

        {/* Left */}
        <div className="flex flex-col justify-center lg:pt-10">

<span className="inline-flex items-center gap-2 w-fit bg-slate-900 dark:bg-emerald-500 px-4 py-2 rounded-full shadow-md transition-all duration-300">
  <MdRestaurantMenu className="text-emerald-500 dark:text-slate-900 text-lg" />
  <span className="font-semibold text-sm text-white tracking-tight">
    Welcome to RecipeVerse
  </span>
</span>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight transition-colors duration-300">
            Discover & Share
            <span className="text-emerald-600"> Delicious Recipes</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 mt-6 text-base md:text-lg leading-7 md:leading-8 max-w-xl transition-colors duration-300">
            Explore, create, and share amazing recipes with food lovers.
            Whether it's a quick breakfast, healthy lunch, or delicious
            dessert, you'll always find inspiration here.
          </p>

        <button
  onClick={addRecipe}
 className="mt-8 w-full sm:w-auto self-start inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-emerald-500 hover:bg-black dark:hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl text-base md:text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
>
  <IoAddCircleSharp className="text-2xl" />
  <span>Share Your Recipe</span>
</button>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src={foodRecipe}
            alt="Food"
            className="rounded-[28px] shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-sm sm:max-w-md object-cover hover:scale-105 hover:shadow-2xl transition-all duration-500"
          />
        </div>
      </section>

      {/* Section Heading */}
      <div
  ref={recipeSectionRef}
  className="text-center py-16 bg-white dark:bg-slate-950 transition-all duration-300"
>
        <h2 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white transition-colors duration-300">
  <RiBookOpenLine className="text-emerald-500 text-3xl md:text-4xl" />
  Latest Recipes
</h2>

        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg transition-colors duration-300">
          Fresh recipes shared by our community
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 mb-12 px-4">
          <input
            type="text"
            placeholder="🔍 Search delicious recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-4 px-6 text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300"
          />
        </div>
      </div>

      {/* Recipes */}
      <RecipeItems search={search} />

      {/* Login Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}