import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import foodRecipe from "../assets/cholebhature.jpg";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";
import RecipeItems from "../components/RecipeItems";

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
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

        {/* Left */}
        <div>
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full font-semibold mb-5">
            🍽️ Welcome to Food Recipe Planner
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Discover & Share
            <span className="text-orange-500"> Delicious Recipes</span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg leading-8">
            Explore, create, and share amazing recipes with food lovers.
            Whether it's a quick breakfast, healthy lunch, or delicious
            dessert, you'll always find inspiration here.
          </p>

          <button
            onClick={addRecipe}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300 hover:scale-105"
          >
            Share Your Recipe
          </button>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <img
            src={foodRecipe}
            alt="Food"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </section>

      {/* Section Heading */}
      <div ref={recipeSectionRef} className="text-center my-16">
        <h2 className="text-4xl font-bold text-gray-800">
          🍲 Latest Recipes
        </h2>

        <p className="text-gray-500 mt-3">
          Fresh recipes shared by our community
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 mb-12">
          <input
            type="text"
            placeholder="🔍 Search delicious recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 py-4 px-5 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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