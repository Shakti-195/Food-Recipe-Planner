import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import foodRecipe from "../assets/cholebhature.jpg";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";
import RecipeItems from "../components/RecipeItems";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";

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
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">

        {/* Left */}
        <div className="flex flex-col justify-center lg:pt-10">

  <span className="inline-flex items-center gap-2 w-fit bg-slate-900 text-white px-5 py-2 rounded-full font-semibold mb-6 shadow-md">
    <MdRestaurantMenu className="text-emerald-400 text-lg" />
    Welcome to RecipeVerse
  </span>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Discover & Share
            <span className="text-emerald-600"> Delicious Recipes</span>
          </h1>

          <p className="text-slate-600 mt-6 text-lg leading-8 max-w-xl">
            Explore, create, and share amazing recipes with food lovers.
            Whether it's a quick breakfast, healthy lunch, or delicious
            dessert, you'll always find inspiration here.
          </p>

        <button
  onClick={addRecipe}
  className="mt-8 self-start inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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
            className="rounded-[28px] shadow-xl border border-slate-200 w-full max-w-md object-cover hover:scale-105 hover:shadow-2xl transition-all duration-500"
          />
        </div>
      </section>

      {/* Section Heading */}
      <div ref={recipeSectionRef} className="text-center my-16">
        <h2 className="text-4xl font-extrabold text-slate-900">
          🍲 Latest Recipes
        </h2>

        <p className="text-slate-500 mt-3 text-lg">
          Fresh recipes shared by our community
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 mb-12">
          <input
            type="text"
            placeholder="🔍 Search delicious recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-300 bg-white py-4 px-6 text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all"
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